import { GET_CHARACTERS } from "./actionTypes";
import axios from "axios";
const baseRickUrl = "https://rickandmortyapi.com/api/";
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

export const onGameStart = () => {
  return {
    type: GET_CHARACTERS,
    payload: axios
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
          (page1,
          page2,
          page3,
          page4,
          page5,
          page6,
          page7,
          page8,
          page9,
          page10)
        )
      )
  };
};
