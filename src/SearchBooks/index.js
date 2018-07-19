import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
// import { Toast } from "antd-mobile";
import * as _ from "lodash";
import * as BooksAPI from "../BooksAPI";
import Book from "../book";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchBooks: [],
      query: ""
    };
  }

  handleKeyUp = _.debounce(value => {
    const query = value.trim();
    if (!query) {
      this.setState({
        searchBooks: [],
        query: ""
      });

      return;
    }

    this.setState(
      {
        query,
        searchBooks: []
      },
      () => {
        this.search();
      }
    );
  }, 300);

  search = () => {
    const { query } = this.state;

    if (query.trim() === "") {
      this.setState({
        searchBooks: [],
        query: ""
      });
      return;
    }

    BooksAPI.search(query).then(searchBooks => {
      if (query !== this.state.query) return;
      if (!Array.isArray(searchBooks)) {
        searchBooks = [];
      }
      this.setState((prevState, props) => {
        const shelfBooks = props.books;

        const newSearchBooks = searchBooks.map(searchBook => {
          // 如果该图书在书架中，会返回该图书，否则返回 undefined
          const searchBookInshelfBook = shelfBooks.find(
            shelfBook => shelfBook.id === searchBook.id
          );
          return {
            ...searchBook,
            shelf: searchBookInshelfBook ? searchBookInshelfBook.shelf : "none"
          };
        });

        return {
          searchBooks: newSearchBooks
        };
      });
    });
  };

  render() {
    const { searchBooks } = this.state;
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
            {searchBooks.map(book => (
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
