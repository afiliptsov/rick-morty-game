import React from "react";
import { Route, Switch } from "react-router-dom";
import CharacterQuiz from "./component/CharacterQuiz/CharacterQuiz";
import StartPage from "./component/StartPage/StartPage";

export default (
  <Switch>
    <Route exact path="/" component={StartPage} />
    <Route path="/quiz" component={CharacterQuiz} />
  </Switch>
);
