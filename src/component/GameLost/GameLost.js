import React, { Component } from "react";
import axios from "axios";
import "./GameLost.css";

class GameLost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      dataArr: []
    };
    this.addScoreResult = this.addScoreResult.bind(this);
    this.getResults = this.getResults.bind(this);
  }
  onNameChangeHandler(e) {
    this.setState({
      name: e.target.value
    });
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
      <div>
        <h1>You Lost!</h1>
        <h1>Store your result</h1>
        <input type="text" onChange={e => this.onNameChangeHandler(e)} />
        <button onClick={this.getResults}>call data</button>
        {console.log(this.state.dataArr)}
        {console.log(this.state.name)}

        <button onClick={this.props.resetGame}>Dont Store</button>
        <button onClick={this.addScoreResult}>Store</button>
        {this.props.savedScore}
        {console.log(this.state.score)}
      </div>
    );
  }
}

export default GameLost;
