import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Toast } from 'antd-mobile';
import * as BooksAPI from '../BooksAPI';
import Book from '../book';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            books: []
        }
    }

    handleKeyUp = e => {
        let query = e.target.value.trim();

        if (query !== '') {
            Toast.loading('Loading', 20);
            BooksAPI.search(query, 20).then(results => {
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
                        })
                        return {
                            books: newResults
                        }
                    })
                } else {
                    this.setState({ books: [] });
                    Toast.hide();
                }
            })
        } else {
            this.setState({ books: [] })
        }

    }

    componentDidUpdate() {
        Toast.hide()
    }

    render() {
        const { books } = this.state;
        const { onShelfChange } = this.props;
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to='/' className="close-search">Close</Link>
                    <div className="search-books-input-wrapper">
                        {/*
                        NOTES: The search from BooksAPI is limited to a particular set of search terms.
                        You can find these search terms here:
                        https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                        However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                        you don't find a specific author or title. Every search is limited by search terms.
                        */}
                        <input
                            type="text"
                            placeholder="Search by title or author"
                            onKeyUp={e => this.handleKeyUp(e)}
                        />

                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {books.map(book => (
                            <Book key={book.id} onShelfChange={onShelfChange} book={book}></Book>
                        ))}
                    </ol>
                </div>
            </div>
        )
    }
}

Search.propTypes = {
    onShelfChange: PropTypes.func.isRequired
}

export default Search;