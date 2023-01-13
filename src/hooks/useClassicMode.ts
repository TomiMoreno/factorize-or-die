import { gameStatuses } from "../utils/types";
import { useGameStore } from "./useGameStore";
import { shallow } from "zustand/shallow";
import { useTimeout } from "./useTimeout";
import { CLASSIC_LIMIT_FACTORIZE_TIME } from "../utils/constants";
import { useEffect } from "react";

/* eslint-disable @typescript-eslint/no-empty-function */
export const useClassicMode = () => {
  const {
    gameStatus,
    setGameStatus,
    numberToFactorize,
    newNumberToFactorize,
    factorizedNumbers,
    setFactorizedNumbers,
  } = useGameStore(
    (state) => ({
      gameStatus: state.gameStatus,
      setGameStatus: state.setGameStatus,
      numberToFactorize: state.numberToFactorize,
      newNumberToFactorize: state.newNumberToFactorize,
      factorizedNumbers: state.factorizedNumbers,
      setFactorizedNumbers: state.setFactorizedNumbers,
    }),
    shallow
  );
  const { start, stop } = useTimeout(
    () => setGameStatus(gameStatuses.lost),
    CLASSIC_LIMIT_FACTORIZE_TIME
  );

  useEffect(() => {
    start();
    return () => stop();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (gameStatus === gameStatuses.won) {
      setGameStatus(gameStatuses.playing);
      newNumberToFactorize();
    }
  }, [gameStatus]); // eslint-disable-line react-hooks/exhaustive-deps

  const playAgain = () => {
    setGameStatus(gameStatuses.playing);
    newNumberToFactorize();
    setFactorizedNumbers(0);
    start();
  };

  return {
    gameStatus:
      gameStatus === gameStatuses.lost
        ? gameStatuses.lost
        : gameStatuses.playing,
    playAgain,
    numberToFactorize,
    factorizedNumbers,
  };
};
