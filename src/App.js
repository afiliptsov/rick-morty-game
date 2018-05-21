import React, { Component } from "react";
import "./App.css";
import CharacterQuiz from "./component/CharacterQuiz/CharacterQuiz";

class App extends Component {
  render() {
    return (
      <div className="App">
        <CharacterQuiz />
      </div>
    );
  }
}

export default App;
