import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Toast } from "antd-mobile";
import * as _ from "lodash";
import * as BooksAPI from "../BooksAPI";
import Book from "../book";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
    };
  }

  handleKeyUp = _.debounce(value => {
    let query = value.trim();

    if (query !== "") {
      Toast.loading("Loading", 20);
      BooksAPI.search(query, 20).then(results => {
        console.log("results", results);
        if (Array.isArray(results)) {
          this.setState((prevState, props) => {
            const shelfBooks = props.books;
            let newResults = results.map(result => {
              for (let shelfBook of shelfBooks) {
                if (result.id === shelfBook.id) {
                  result.shelf = shelfBook.shelf;
                }
              }
              return result;
            });
            return {
              books: newResults
            };
          });
        } else {
          this.setState({ books: [] });
          Toast.hide();
        }
      });
    } else {
      this.setState({ books: [] });
    }
  }, 300);

  componentDidUpdate() {
    Toast.hide();
  }

  render() {
    const { books } = this.state;
    const { onShelfChange } = this.props;
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              onKeyUp={e => this.handleKeyUp(e.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {books.map(book => (
              <Book key={book.id} onShelfChange={onShelfChange} book={book} />
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

Search.propTypes = {
  onShelfChange: PropTypes.func.isRequired
};

export default Search;
