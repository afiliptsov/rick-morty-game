import axios from "axios";

import { INCREASE_SCORE, GAME_LOST } from "../actions/actionTypes";

const initialState = {
  score: 0,
  storedScore: 0
};

const scoreReducer = (state = initialState, action) => {
  switch (action.type) {
    case INCREASE_SCORE:
      return {
        ...state,
        score: state.score + 1
      };
    case GAME_LOST:
      return {
        ...state,
        storedScore: state.score,
        score: 0
      };
  }
  return state;
};

export default scoreReducer;
