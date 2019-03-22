import { INCREASE_SCORE, GAME_LOST } from "./actionTypes";

export const onIncrementScore = () => {
  return { type: INCREASE_SCORE };
};

export const gameLost = () => {
  return {
    type: GAME_LOST
  };
};
