import { gameStatuses } from "../utils/types";
import { useGameStore } from "./useGameStore";
import { useNumberFact } from "./useNumbersFact";
import shallow from "zustand/shallow";

/* eslint-disable @typescript-eslint/no-empty-function */
export const useFreeMode = () => {
  const { gameStatus, setGameStatus, numberToFactorize, newNumberToFactorize } =
    useGameStore(
      (state) => ({
        gameStatus: state.gameStatus,
        setGameStatus: state.setGameStatus,
        numberToFactorize: state.numberToFactorize,
        newNumberToFactorize: state.newNumberToFactorize,
      }),
      shallow
    );
  const fact = useNumberFact();

  const next = () => {
    setGameStatus(gameStatuses.playing);
    newNumberToFactorize();
  };

  return {
    gameStatus,
    next,
    numberToFactorize,
    fact,
  };
};
