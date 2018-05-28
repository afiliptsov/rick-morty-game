import React, { Component } from "react";
import "./StartPage.css";
import { HashRouter, Route, Switch, Link } from "react-router-dom";

class StartPage extends Component {
  render() {
    return (
      <div className="main-screen">
        <div className="intro-center-buttons">
          <h1 className="intro-primary" />
          <Link to="/quiz">
            <a href="#" class="btn btn-white btn-animated">
              Start
            </a>
          </Link>
        </div>
      </div>
    );
  }
}

export default StartPage;
