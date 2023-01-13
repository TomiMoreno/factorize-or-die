import { shallow } from "zustand/shallow";
import { useEffect } from "react";
import { BULLET_LIMIT_FACTORIZE_TIME } from "../utils/constants";
import { gameStatuses } from "../utils/types";
import { useGameStore } from "./useGameStore";
import { useNumberFact } from "./useNumbersFact";
import { useTimeout } from "./useTimeout";

/* eslint-disable @typescript-eslint/no-empty-function */
export const useBulletMode = () => {
  const {
    gameStatus,
    setGameStatus,
    numberToFactorize,
    newNumberToFactorize,
    factors,
  } = useGameStore(
    (state) => ({
      gameStatus: state.gameStatus,
      setGameStatus: state.setGameStatus,
      numberToFactorize: state.numberToFactorize,
      newNumberToFactorize: state.newNumberToFactorize,
      factors: state.factors,
    }),
    shallow
  );
  const fact = useNumberFact();
  const { start, stop } = useTimeout(
    () => setGameStatus(gameStatuses.lost),
    BULLET_LIMIT_FACTORIZE_TIME
  );

  useEffect(() => {
    if (gameStatus === gameStatuses.playing) start();
    if (gameStatus === gameStatuses.won) stop();

    return () => {
      stop();
    };
  }, [gameStatus]); // eslint-disable-line react-hooks/exhaustive-deps

  const tryAgain = () => {
    newNumberToFactorize();
    setGameStatus(gameStatuses.playing);
  };

  const next = () => {
    newNumberToFactorize();
    setGameStatus(gameStatuses.playing);
  };

  return {
    gameStatus,
    tryAgain,
    next,
    numberToFactorize,
    factors,
    fact,
  };
};
