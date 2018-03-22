import React, { Component } from "react";
import { Route } from "react-router-dom";
import { Toast } from "antd-mobile";
import * as BooksAPI from "./BooksAPI";
import "./App.css";

import ListBooks from "./ListBooks";
import SearchBooks from "./SearchBooks";

class BooksApp extends Component {
  constructor() {
    super();
    this.state = {
      books: []
    };
  }

  componentDidMount() {
    Toast.loading("Loading", 20);
    BooksAPI.getAll()
      .then(books => {
        this.setState({ books });
      })
      .catch(error => {
        Toast.fail("No network found.");
      });
  }

  componentDidUpdate() {
    Toast.hide();
  }

  shelfChange = book => {
    Toast.loading("Moving", 20);
    const shelf = book.shelf;
    let hasBook = false;

    BooksAPI.update(book, shelf).then(() => {
      this.setState(prevState => {
        let prevBooks = prevState.books;

        let newBooks = prevBooks.map(prevBook => {
          if (prevBook.id === book.id) {
            hasBook = true;
            return book;
          } else {
            return prevBook;
          }
        });

        if (!hasBook && shelf !== "none") {
          newBooks.push(book);
          Toast.info("Book added.", 1);
        } else if (hasBook && shelf === "none") {
          newBooks.splice(newBooks.indexOf(book), 1);
          Toast.info("Book removed.", 1);
        }

        return {
          books: newBooks
        };
      });
    });
  };

  render() {
    const shelfBooks = this.state.books;
    const shelfChange = this.shelfChange;
    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() => (
            <ListBooks books={shelfBooks} onShelfChange={shelfChange} />
          )}
        />

        <Route
          path="/search"
          render={() => (
            <SearchBooks books={shelfBooks} onShelfChange={shelfChange} />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
