import React from 'react';
import Book from './book';
import notFound from './search.png';
import {Link} from 'react-router-dom';
import * as BooksAPI from './BooksAPI';

class Search extends React.Component{
    state={
        content:[],
    }
    componentDidMount(){
        console.log("Search Mounted");
        this.setState({
            content:[]
        })
    }
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
    render(){
        const prop = this.props
        return(
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
                    {this.state.content.length>0 ? (
                    <ol className="books-grid">
                      {this.state.content.map((book) => (
                        <li key={book.id}>
                          <Book
                            updateShelf={(book,shelf) => {
                              prop.updateShelf(book,shelf);
                            }}
                            book={book}
                          />
                        </li>
                      ))}
                    </ol>):(
                      <div className="nothing">
                    <img src={notFound} alt="Not Found" />
                    <h3 id="not-found">No Books Found</h3></div>)
                    }
                  </div>
                </div>
        )
        
    }
}

export default Search;