import axios from "axios";

import { GET_CHARACTERS } from "../actions/actionTypes";

const initialState = {
  charArr: []
};

const scoreReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CHARACTERS:
      return {
        ...state,
        charArr: action.payload.data
      };
  }
  return state;
};

export default characterReducer;
