import React from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import Book from "./book";
import { Link, Route } from "react-router-dom";
import ListBook from "./ListBook";

class BooksApp extends React.Component {
  state = {
    content: [],
    currentlyReading: [],
    wantToRead: [],
    read: [],
  };

  addBook(data, book) {
    data.push(book);
    return data;
  }

  changeFromCurrentlyReading = (book, changeTo) => {
    if (changeTo === "wantToRead") {
      this.setState((currentState) => ({
        currentlyReading: currentState.currentlyReading.filter((data) => {
          return book.id !== data.id;
        }),
        wantToRead: this.addBook(currentState.wantToRead, book),
      }));
    } else if (changeTo === "read") {
      this.setState((currentState) => ({
        currentlyReading: currentState.currentlyReading.filter((data) => {
          return book.id !== data.id;
        }),
        read: this.addBook(currentState.read, book),
      }));
    }
  };
  changeFromRead = (book, changeTo) => {
    if (changeTo === "wantToRead") {
      this.setState((currentState) => ({
        read: currentState.read.filter((data) => {
          return book.id !== data.id;
        }),
        wantToRead: this.addBook(currentState.wantToRead, book),
      }));
    } else if (changeTo === "currentlyReading") {
      this.setState((currentState) => ({
        read: currentState.read.filter((data) => {
          return book.id !== data.id;
        }),
        currentlyReading: this.addBook(currentState.currentlyReading, book),
      }));
    }
  };
  addBookToShelf = (book, category) => {
    if (category === "read") {
      this.setState((currentState) => ({
        read: this.addBook(currentState.read, book),
        content: [],
      }));
    } else if (category === "wantToRead") {
      this.setState((currentState) => ({
        wantToRead: this.addBook(currentState.wantToRead, book),
        content: [],
      }));
    } else if (category === "currentlyReading") {
      this.setState((currentState) => ({
        currentlyReading: this.addBook(currentState.currentlyReading, book),
        content: [],
      }));
    }
  };
  changeFromWantToRead = (book, changeTo) => {
    if (changeTo === "read") {
      this.setState((currentState) => ({
        wantToRead: currentState.wantToRead.filter((data) => {
          return book.id !== data.id;
        }),
        read: this.addBook(currentState.read, book),
      }));
    } else if (changeTo === "currentlyReading") {
      this.setState((currentState) => ({
        wantToRead: currentState.wantToRead.filter((data) => {
          return book.id !== data.id;
        }),
        currentlyReading: this.addBook(currentState.currentlyReading, book),
      }));
    }
  };

  changeContent = (query) => {
    if (query !== "") {
      BooksAPI.search(query).then((data) => {
        let books = data;
        if (data.error) {
          books = [];
        }
        this.setState(() => ({
          content: books,
        }));
      });
    } else {
      this.setState(() => ({
        content: [],
        query: "",
      }));
    }
  };

  render() {
    return (
      <div className="app">
        <Route
          path="/search"
          render={({ history }) => (
            <div className="search-books">
              <div className="search-books-bar">
                <Link className="close-search" to="/">
                  Close
                </Link>
                <div className="search-books-input-wrapper">
                  <input
                    onChange={(event) => {
                      this.changeContent(event.target.value);
                    }}
                    type="text"
                    placeholder="Search by title or author"
                  />
                </div>
              </div>
              <div className="search-books-results">
                <ol className="books-grid">
                  {this.state.content.map((book) => (
                    <li key={book.id}>
                      <Book
                        book={book}
                        onChange={(book, changeTo) => {
                          this.addBookToShelf(book, changeTo);
                          history.push("/");
                        }}
                      />
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          )}
        />
        <Route
          exact
          path="/"
          render={() => (
            <ListBook
              currentlyReading={this.state.currentlyReading}
              wantToRead={this.state.wantToRead}
              read={this.state.read}
              changeFromCurrentlyReading={this.changeFromCurrentlyReading}
              onChange={{
                changeFromCurrentlyReading: this.changeFromCurrentlyReading,
                changeFromRead: this.changeFromRead,
                changeFromWantToRead: this.changeFromWantToRead,
              }}
            />
          )}
        />
        {this.changeFromWantToRead}
      </div>
    );
  }
}

export default BooksApp;
