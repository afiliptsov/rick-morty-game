import React, { Component } from "react";
import axios from "axios";
import quizOptions from "./CharacterQuiz.css";
import { HashRouter, Route, Switch, Link } from "react-router-dom";
require("dotenv").config();

const baseRickUrl = process.env.REACT_APP_API_URL;
const page1 = "character/?page=1";
const page2 = "character/?page=2";
const page3 = "character/?page=3";
const page4 = "character/?page=4";
const page5 = "character/?page=5";

class CharacterQuiz extends Component {
  constructor() {
    super();
    this.state = {
      charArr: [],
      randomFour: [],
      randomImageName: "",
      score: 0,
      storedResult: 0
    };
    this.chooseRandomFour = this.chooseRandomFour.bind(this);
    this.chooseRandomImageName = this.chooseRandomImageName.bind(this);
    this.checkImageName = this.checkImageName.bind(this);
  }

  componentDidMount() {
    console.log("ComponentDiDMount!");

    axios
      .all([
        axios.get(baseRickUrl + page1),
        axios.get(baseRickUrl + page2),
        axios.get(baseRickUrl + page3),
        axios.get(baseRickUrl + page4),
        axios.get(baseRickUrl + page5)
      ])
      .then(
        axios.spread((page1, page2, page3, page4, page5) => {
          this.setState({
            charArr: [
              ...page1.data.results,
              ...page2.data.results,
              ...page3.data.results,
              ...page4.data.results,
              ...page5.data.results
            ]
          });
        })
      );
  }

  chooseRandomFour(callback) {
    var i = 0;
    var tempArr = [];
    while (i < 4) {
      tempArr.push(
        this.state.charArr[
          Math.floor(Math.random() * this.state.charArr.length)
        ]
      );
      i++;
      this.setState({
        randomFour: tempArr
      });
    }
    callback(tempArr);
  }
  chooseRandomImageName(arr) {
    var i = 0;
    var chosenObject;
    chosenObject = arr[Math.floor(Math.random() * arr.length)];
    this.setState({ randomImageName: chosenObject.name });
  }

  checkImageName(name, callback) {
    let score = 0;
    if (name === this.state.randomImageName) {
      console.log("True");
      this.setState({
        score: this.state.score + 1
      });
      this.chooseRandomFour(this.chooseRandomImageName);
      console.log(score);
    } else {
      console.log("Game Over");
      this.setState({
        storedResult: this.state.score,
        score: 0
      });
      this.chooseRandomFour(this.chooseRandomImageName);
      console.log(this.state.score);
    }
  }

  render() {
    let characterArray = this.state.randomFour.map((element, i) => {
      return (
        <div key={i}>
          <img
            className="picture"
            onClick={() => this.checkImageName(element.name)}
            src={element.image}
          />
        </div>
      );
    });

    return (
      <div>
        {console.log(this.state.charArr)}
        {console.log(this.state.randomFour)}

        <button
          onClick={() => this.chooseRandomFour(this.chooseRandomImageName)}
        >
          Next
        </button>
        <p>Score: {this.state.score}</p>
        <p>{this.state.randomImageName}</p>
        <div className="quizOptions">{characterArray}</div>
      </div>
    );
  }
}

export default CharacterQuiz;
