import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Shelf from '../shelf';

class ListBooks extends Component {
    render() {
        const { books, onShelfChange } = this.props;
        const shelfs = {
            shelfs: [{
                title: 'Currently Reading',
                books: books.filter(book => book.shelf === 'currentlyReading')
            },
            {
                title: 'Want to Read',
                books: books.filter(book => book.shelf === 'wantToRead')
            },
            {
                title: 'Read',
                books: books.filter(book => book.shelf === 'read')
            }
            ]
        }

        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                    { shelfs.shelfs.map(shelf => (
                        <Shelf key={shelf.title} onShelfChange={onShelfChange} title={shelf.title} books={shelf.books} />
                    )) }
                    </div>
                </div>
                <div className="open-search">
                    <Link to='/search'>Add a book</Link>
                </div>
            </div>
        )
    }
}

ListBooks.propTypes = {
    books: PropTypes.array.isRequired,
    onShelfChange: PropTypes.func.isRequired
}

export default ListBooks;