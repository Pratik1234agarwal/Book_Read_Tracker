import React from "react";

function Book(props) {
  const book = props.book;
  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={
            book.imageLinks && {
              width: 128,
              height: 193,
              backgroundImage: `url(${book.imageLinks.thumbnail})`,
            }
          }
        />
        <div className="book-shelf-changer">
          <select defaultValue="move" onChange={(event)=>{
              props.onChange(props.book,event.target.value);
            }}>
            <option value="move" disabled>
              Move to...
            </option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{book.title}</div>
      <div className="book-authors">{book.authors}</div>
    </div>
  );
}

export default Book;
