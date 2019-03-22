import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import { HashRouter } from "react-router-dom";
import { createStore, combineReducers, applyMiddleware } from "redux";
import promiseMiddleware from "redux-promise-middleware";
import { Provider } from "react-redux";
import scoreReducer from "./store/reducers/scoreReducer";

const rootReducer = combineReducers({
  scr: scoreReducer
});

const store = createStore(rootReducer, applyMiddleware(promiseMiddleware()));

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>,
  document.getElementById("root")
);
// registerServiceWorker();
