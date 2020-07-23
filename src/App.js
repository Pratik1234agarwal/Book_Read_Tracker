import React from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import Book from "./book";
import { Link, Route } from "react-router-dom";
import ListBook from "./ListBook";

class BooksApp extends React.Component {
  state = {
    content: [],
    books: []
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
        let flag=0;
        let newBooks = prevState.books.map((book_)=>{
            if(book_.id===book.id){
              book_.shelf=shelf;
              flag=1;
            }
            return book_;
        })
        if(flag===0){
          book.shelf=shelf;
          newBooks.push(book);
        }
        return {
          books:newBooks
        };
      });
    });
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
                        updateShelf={(book,shelf) => {
                          this.updateShelf(book,shelf);
                          history.push("/");
                        }}
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
              books={this.state.books}
              updateShelf={this.updateShelf}
            />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
