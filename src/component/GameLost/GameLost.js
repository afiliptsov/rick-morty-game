import React, { Component } from "react";
import axios from "axios";
import "./GameLost.css";
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

firebase.initializeApp({
  apiKey: "AIzaSyCRAxEvhLymg3rcQwhNVpsH-XUqhTqdDRE",
  authDomain: "rick-morty-8c610.firebaseapp.com"
});
class GameLost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      dataArr: [],
      isSignedIn: false
    };
    this.uiConfig = {
      signInFlow: "popup",
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        firebase.auth.GithubAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID
      ],
      callbacks: {
        signInSuccess: () => false
      }
    };
    this.addScoreResult = this.addScoreResult.bind(this);
    this.getResults = this.getResults.bind(this);
  }
  onNameChangeHandler(e) {
    this.setState({
      name: e.target.value
    });
  }
  componentDidMount() {
    this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
      this.setState({ isSignedIn: !!user }),
        console.log("user Data from Firebase", user);
    });
  }
  componentWillUnmount() {
    this.unregisterAuthObserver();
  }

  getResults() {
    axios.get("http://localhost:3001/api/leaderboard").then(response => {
      console.log("RESPONSE HERE");
      console.log(response);
      this.setState({
        dataArr: response.data
      });
    });
    console.log(this.state.dataArr);
  }

  addScoreResult() {
    let scoreResult = {
      name: this.state.name,
      score: this.props.savedScore
    };
    axios
      .post("http://localhost:3001/api/score", scoreResult)
      .then(this.getResults)
      .then(this.props.resetGame);
  }

  render() {
    return (
      <div className="game-lost">
        <div className="result-score">
          <h1>Game Over!</h1>
          <br />
          <br />
          <h1>Lets save your Score!</h1>
          <br />
          <input type="text" onChange={e => this.onNameChangeHandler(e)} />
          <button onClick={this.addScoreResult}>Store</button>
          <br />
          <button onClick={this.getResults}>call data</button>
          {console.log(this.state.dataArr)}
          {console.log(this.state.name)}

          <button onClick={this.props.resetGame}>New Game</button>

          {this.state.isSignedIn ? (
            <div>Signed in</div>
          ) : (
            <div>
              <div>TEST</div>
              <StyledFirebaseAuth
                uiConfig={this.uiConfig}
                firebaseAuth={firebase.auth()}
              />
            </div>
          )}
          {this.props.savedScore}
          {console.log(this.state.score)}
        </div>
      </div>
    );
  }
}

export default GameLost;
