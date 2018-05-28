import React, { Component } from "react";
import "./App.css";
import StartPage from "./component/StartPage/StartPage";
import CharacterQuiz from "./component/CharacterQuiz/CharacterQuiz";
import { HashRouter, Route, Switch, Link } from "react-router-dom";
import routes from "./routes";

class App extends Component {
  render() {
    return <div className="App">{routes}</div>;
  }
}

export default App;
