import React from 'react';
import {Link} from 'react-router-dom';
import Book from './book';


function ListBook(prop){
    return(
        <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {prop.currentlyReading.map((book)=>(
                        <li key={book.id}>
                          <Book 
                            book={book} 
                            onChange={prop.onChange.changeFromCurrentlyReading}
                          />
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                    {prop.wantToRead.map((book)=>(
                        <li key={book.id}>
                          <Book 
                            book={book} 
                            onChange={prop.onChange.changeFromWantToRead}
                          />
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {prop.read.map((book)=>(
                          <li key={book.id}>
                            <Book 
                            book={book} 
                            onChange={prop.onChange.changeFromRead}
                            />
                          </li>
                        ))}
                    </ol>
                  </div>
                </div>
              </div>
            </div>
            <div className="open-search">
              <Link to="/search">
                <button>
                  Add a book
                </button>
              </Link>
            </div>
          </div>
    )

}

export default ListBook;