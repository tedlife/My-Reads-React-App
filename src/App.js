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

    BooksAPI.update(book, shelf)
      .then(() => {
        this.setState(prevState => {
          let newBooks;

          const restOfBooksInShelf = prevState.books.filter(
            preBook => preBook.id !== book.id
          );

          if (shelf !== "none") {
            newBooks = restOfBooksInShelf.concat([book]);
            Toast.info("Book moved.", 1);
          } else {
            newBooks = restOfBooksInShelf;
            Toast.info("Book removed.", 1);
          }

          return {
            books: newBooks
          };
        });
      })
      .catch(e => {
        Toast.hide();
        Toast.info(`${e}`, 5);
      });
  };

  render() {
    const { books } = this.state;
    const shelfChange = this.shelfChange;
    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() => <ListBooks books={books} onShelfChange={shelfChange} />}
        />

        <Route
          path="/search"
          render={() => (
            <SearchBooks books={books} onShelfChange={shelfChange} />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
