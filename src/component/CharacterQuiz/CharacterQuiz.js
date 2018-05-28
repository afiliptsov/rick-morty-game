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
const page6 = "character/?page=6";
const page7 = "character/?page=7";
const page8 = "character/?page=8";
const page9 = "character/?page=9";
const page10 = "character/?page=10";

class CharacterQuiz extends Component {
  constructor() {
    super();
    this.state = {
      charArr: [],
      randomFour: [],
      randomImageName: "",
      score: 0,
      storedResult: 0,
      quizStarted: true
    };
    this.chooseRandomFour = this.chooseRandomFour.bind(this);
    this.chooseRandomImageName = this.chooseRandomImageName.bind(this);
    this.checkImageName = this.checkImageName.bind(this);
    this.enableQuiz = this.enableQuiz.bind(this);
  }

  componentDidMount() {
    console.log("ComponentDiDMount!");

    axios
      .all([
        axios.get(baseRickUrl + page1),
        axios.get(baseRickUrl + page2),
        axios.get(baseRickUrl + page3),
        axios.get(baseRickUrl + page4),
        axios.get(baseRickUrl + page5),
        axios.get(baseRickUrl + page6),
        axios.get(baseRickUrl + page7),
        axios.get(baseRickUrl + page8),
        axios.get(baseRickUrl + page9),
        axios.get(baseRickUrl + page10)
      ])
      .then(
        axios.spread(
          (
            page1,
            page2,
            page3,
            page4,
            page5,
            page6,
            page7,
            page8,
            page9,
            page10
          ) => {
            this.setState({
              charArr: [
                ...page1.data.results,
                ...page2.data.results,
                ...page3.data.results,
                ...page4.data.results,
                ...page5.data.results,
                ...page6.data.results,
                ...page7.data.results,
                ...page8.data.results,
                ...page9.data.results,
                ...page10.data.results
              ]
            });
          }
        )
      );
    //this.chooseRandomFour(this.chooseRandomImageName);
  }

  enableQuiz() {
    return this.setState({
      quizStarted: !this.state.quizStarted
    });
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
      <div className="main-screen">
        <div className="intro-center-buttons">
          {console.log(this.state.charArr)}
          {console.log(this.state.randomFour)}
          {this.state.quizStarted ? (
            <button
              className="start-game-button"
              onClick={() => this.chooseRandomFour(this.chooseRandomImageName)}
            >
              Next
            </button>
          ) : null}
          <h1>
            <p>Score: {this.state.score}</p>

            <p>{this.state.randomImageName}</p>
          </h1>
          <div className="quizOptions">{characterArray}</div>
        </div>
      </div>
    );
  }
}

export default CharacterQuiz;
