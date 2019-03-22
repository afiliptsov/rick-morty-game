import React, { Component } from "react";
import axios from "axios";
import "./CharacterQuiz.css";
import { HashRouter, Route, Switch, Link } from "react-router-dom";
import GameLost from "../GameLost/GameLost";
import { connect } from "react-redux";
// import * as actionTypes from "../../store/actionTypes";
import { onIncrementScore, gameLost } from "../../store/actions/index";

// const baseRickUrl = "https://rickandmortyapi.com/api/";
// const page1 = "character/?page=1";
// const page2 = "character/?page=2";
// const page3 = "character/?page=3";
// const page4 = "character/?page=4";
// const page5 = "character/?page=5";
// const page6 = "character/?page=6";
// const page7 = "character/?page=7";
// const page8 = "character/?page=8";
// const page9 = "character/?page=9";
// const page10 = "character/?page=10";

class CharacterQuiz extends Component {
  constructor() {
    super();
    this.state = {
      charArr: [],
      randomFour: [],
      randomImageName: "",
      gameEnded: false
    };
    this.chooseRandomFour = this.chooseRandomFour.bind(this);
    this.chooseRandomImageName = this.chooseRandomImageName.bind(this);
    this.checkImageName = this.checkImageName.bind(this);
    this.cleanNonExistingCharacters = this.cleanNonExistingCharacters.bind(
      this
    );
    this.resetGame = this.resetGame.bind(this);
  }

  componentDidMount() {
    console.log("ComponentDiDMount!");

    axios.get("http://localhost:3001/api/characters").then(res => {
      console.log("RESPONSE DATA", res.data);
      this.setState(
        {
          charArr: res.data
        },
        () => {
          this.state.charArr.map(element => {
            console.log(element.name);
          });
          setTimeout(() => {
            this.cleanNonExistingCharacters();
            this.chooseRandomFour(this.chooseRandomImageName);
          }, 5000);
        }
      );
      console.log(this.state.charArr);
    });

    // axios
    //   .all([
    //     axios.get(baseRickUrl + page1),
    //     axios.get(baseRickUrl + page2),
    //     axios.get(baseRickUrl + page3),
    //     axios.get(baseRickUrl + page4),
    //     axios.get(baseRickUrl + page5),
    //     axios.get(baseRickUrl + page6),
    //     axios.get(baseRickUrl + page7),
    //     axios.get(baseRickUrl + page8),
    //     axios.get(baseRickUrl + page9),
    //     axios.get(baseRickUrl + page10)
    //   ])
    //   .then(
    //     axios.spread(
    //       (
    //         page1,
    //         page2,
    //         page3,
    //         page4,
    //         page5,
    //         page6,
    //         page7,
    //         page8,
    //         page9,
    //         page10
    //       ) => {
    //         this.setState(
    //           {
    //             charArr: [
    //               ...page1.data.results,
    //               ...page2.data.results,
    //               ...page3.data.results,
    //               ...page4.data.results,
    //               ...page5.data.results,
    //               ...page6.data.results,
    //               ...page7.data.results,
    //               ...page8.data.results,
    //               ...page9.data.results,
    //               ...page10.data.results
    //             ]
    //           },
    //           () => {
    // this.cleanNonExistingCharacters();
    //             this.chooseRandomFour(this.chooseRandomImageName);
    //           }
    //         );
    //       }
    //     )
    //   );
  }

  resetGame() {
    this.setState({
      gameEnded: !this.state.gameEnded
    });
  }

  cleanNonExistingCharacters() {
    const toDelete = [19, 66, 104, 189];
    const newArray = this.state.charArr.filter(
      obj => !toDelete.includes(obj.id)
    );

    this.setState({
      charArr: newArray
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
    if (name === this.state.randomImageName) {
      console.log("True");
      //Adding redux here
      this.props.onIncrementScore();
      // this.setState({
      //   score: this.state.score + 1
      // });
      this.chooseRandomFour(this.chooseRandomImageName);
    } else {
      console.log("Game Over");
      this.props.gameLost();

      this.setState({
        gameEnded: true
      });

      this.chooseRandomFour(this.chooseRandomImageName);
    }
  }

  render() {
    let characterArray = this.state.randomFour.map((element, i) => {
      return (
        <div className="option-wrap" key={i}>
          <img
            className="pictures"
            onClick={() => this.checkImageName(element.name)}
            src={element.image}
          />
        </div>
      );
    });

    let gameLost = (
      <GameLost savedScore={this.props.storedScr} resetGame={this.resetGame} />
    );

    let introCenter = (
      <div className="intro-center-quiz">
        {console.log(this.state.charArr)}
        {console.log(this.state.randomFour)}
        <h1>
          <p className="score">Score: {this.props.scr}</p>

          <p className="name">{this.state.randomImageName}</p>
        </h1>
        <div className="quizOptions">{characterArray}</div>
      </div>
    );
    return (
      <div className="padding">
        <div className="main-screen-quiz">
          {this.state.gameEnded ? gameLost : introCenter}
        </div>
        {console.log("MAP STATE TO PROPS SCORE", this.props)}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    scr: state.scr.score,
    storedScr: state.scr.storedScore
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onIncrementScore: () => dispatch(onIncrementScore()),
    gameLost: () => dispatch(gameLost())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CharacterQuiz);
