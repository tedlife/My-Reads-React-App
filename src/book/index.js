import React, { Component } from "react";
import PropTypes from "prop-types";

class Book extends Component {
  handleSelect = (e, book) => {
    let value = e.target.value;
    book.shelf = value;
    this.props.onShelfChange(book);
  };

  render() {
    const book = this.props.book;
    const image = book.imageLinks
      ? book.imageLinks.thumbnail
      : "https://books.google.com/googlebooks/images/no_cover_thumb.gif";
    const title = book.title ? book.title : "No Title";
    const author = book.authors ? book.authors.join(", ") : "No Author";
    const shelf = book.shelf ? book.shelf : "none";
    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div
              className="book-cover"
              style={{
                width: 128,
                height: 193,
                backgroundImage: `url(${image})`
              }}
            />
            <div className="book-shelf-changer">
              <select value={shelf} onChange={e => this.handleSelect(e, book)}>
                <option value="moveTo" disabled>
                  Move to...
                </option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{title}</div>
          <div className="book-authors">{author}</div>
        </div>
      </li>
    );
  }
}

Book.propTypes = {
  book: PropTypes.object.isRequired,
  onShelfChange: PropTypes.func.isRequired
};

export default Book;
