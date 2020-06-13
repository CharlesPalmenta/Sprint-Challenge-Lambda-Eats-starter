import React from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import "./index.css";
import Form from "./Form";

const App = () => {
  return (
    <Router>
      <h1>Lambda Eats Pizza</h1>
      <nav>
        <Link to="/">
          <button className="App-link" name="home">Home</button>
        </Link>
        <Link to="/pizza">
          <button className="App-link" name="pizza">Order Pizza</button>
        </Link>
      </nav>
    </Router>
  );
};
export default App;
