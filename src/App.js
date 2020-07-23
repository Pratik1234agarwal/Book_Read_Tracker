import React from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import Book from "./book";
import { Link, Route } from "react-router-dom";
import ListBook from "./ListBook";
import Search from "./Search.js";

class BooksApp extends React.Component {
  state = {
    books: [],
  };

  componentDidMount() {
    BooksAPI.getAll().then((data) => {
      this.setState({
        books: data,
      });
    });
  }

  updateShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      this.setState((prevState) => {
        let flag = 0;
        let newBooks = prevState.books.map((book_) => {
          if (book_.id === book.id) {
            book_.shelf = shelf;
            flag = 1;
          }
          return book_;
        });
        if (flag === 0) {
          book.shelf = shelf;
          newBooks.push(book);
        }
        return {
          books: newBooks,
        };
      });
    });
  };

  render() {
    return (
      <div className="app">
        <Route
          path="/search"
          render={({ history }) => <Search updateShelf={(book,shelf)=>{
                this.updateShelf(book,shelf)
                history.push("/");
            }} />}
        />
        <Route
          exact
          path="/"
          render={() => (
            <ListBook books={this.state.books} updateShelf={this.updateShelf} />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
