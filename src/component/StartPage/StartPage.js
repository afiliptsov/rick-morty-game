import React, { Component } from "react";
import "./StartPage.css";
import { HashRouter, Route, Switch, Link } from "react-router-dom";
import { connect } from "react-redux";
import { onGameStart } from "../../store/actions/character";

class StartPage extends Component {
  render() {
    let a = this.props;
    console.log("Log", a);
    return (
      <div className="padding">
        <div className="main-screen-quiz">
          <div className="intro-center-buttons">
            <h1 className="intro-primary" />
            <Link to="/quiz">
              <a href="#" className="btn btn-white btn-animated">
                Start
              </a>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onGameStart: () => dispatch(onGameStart())
  };
};

export default connect(mapDispatchToProps)(StartPage);
