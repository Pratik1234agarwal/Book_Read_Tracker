import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import * as BooksApi from './BooksAPI';
async function test(){
	console.log("Testing the api")
	const response = await BooksApi.getAll();
  console.log(response);
  console.log(response[0])
  console.log("This is the end of data received")
}


test();

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);

