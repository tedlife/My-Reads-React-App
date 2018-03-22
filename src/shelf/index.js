import React, { Component } from "react";
import PropTypes from "prop-types";
import Book from "../book";

class Shelf extends Component {
  render() {
    const { title, books, onShelfChange } = this.props;
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.length !== 0 ? (
              books.map(book => (
                <Book key={book.id} onShelfChange={onShelfChange} book={book} />
              ))
            ) : (
              <li>No books found</li>
            )}
          </ol>
        </div>
      </div>
    );
  }
}

Shelf.propTypes = {
  title: PropTypes.string.isRequired,
  books: PropTypes.array.isRequired,
  onShelfChange: PropTypes.func.isRequired
};

export default Shelf;
