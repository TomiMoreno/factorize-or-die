import { create } from "zustand";
import { shallow } from "zustand/shallow";
import { subscribeWithSelector } from "zustand/middleware";
import {
  elevateFromString,
  getFactors,
  isPrime,
  randomNum,
} from "../utils/math";
import { gameStatuses, gameModes } from "../utils/types";
import { DEFAULT_FACT } from "../utils/constants";

interface GameState {
  numberToFactorize: number;
  factors: number[];
  factorizedNumbers: number;
  fact: string;
  setFact: (text: string) => void;
  setFactorizedNumbers: (number: number) => void;
  setNumberToFactorize: (number: number) => void;
  newNumberToFactorize: () => void;
  factorizedInput: string;
  setFactorizedInput: (input: string) => void;
  gameStatus: gameStatuses;
  setGameStatus: (status: gameStatuses) => void;
  timeToLose: number;
  setTimeToLose: (time: number) => void;
  gameMode: gameModes;
  setGameMode: (mode: gameModes) => void;
}

export const useGameStore = create(
  subscribeWithSelector<GameState>((set) => {
    const newNumberToFactorize = () => {
      set(({ numberToFactorize: prevNumber, factorizedNumbers }) => {
        let newNumber: number = prevNumber;
        while (newNumber === prevNumber) {
          newNumber = randomNum();
        }
        return {
          numberToFactorize: newNumber,
          factorizedNumbers: factorizedNumbers + 1,
        };
      });
    };

    const checkWin = (input: string, numberToFactorize: number) => {
      const exponents: number[] = [];
      const factors = input
        .replaceAll("**", "^")
        .split("*")
        .map((factor) => {
          if (factor.includes("^")) {
            const [base, exponent] = elevateFromString(factor);
            exponents.push(exponent);
            return base;
          } else {
            exponents.push(1);
            return parseInt(factor);
          }
        });
      console.log({ factors, exponents });
      // Validations
      if (
        factors.some(
          (factor) => !Number.isInteger(factor) || factor > numberToFactorize
        )
      ) {
        return false;
      }
      const areFactorsPrime = factors.every(isPrime);
      if (!areFactorsPrime) {
        return false;
      }
      const multipliedFactors = factors.reduce(
        (acc, factor, i) => acc * Math.pow(factor, exponents[i] ?? 1),
        1
      );
      console.log({ multipliedFactors });
      return multipliedFactors === numberToFactorize;
    };

    return {
      factorizedInput: "",
      fact: DEFAULT_FACT,
      factorizedNumbers: 0,
      factors: [],
      gameMode: gameModes.none,
      gameStatus: gameStatuses.playing,
      newNumberToFactorize,
      numberToFactorize: randomNum(),
      setFact: (text) => set({ fact: text }),
      setFactorizedInput: (factorizedInput) => {
        set(({ numberToFactorize, gameStatus }) => {
          const hasWon = checkWin(factorizedInput, numberToFactorize);
          return {
            factorizedInput,
            gameStatus: hasWon ? gameStatuses.won : gameStatus,
          };
        });
      },
      setFactorizedNumbers: (number) =>
        set({
          factorizedNumbers: number,
        }),
      setGameMode: (mode) =>
        set({
          gameMode: mode,
        }),
      setGameStatus: (status) =>
        set({
          gameStatus: status,
        }),
      setNumberToFactorize: (number: number) =>
        set({
          numberToFactorize: number,
        }),
      setTimeToLose: (time) =>
        set({
          timeToLose: time,
        }),
      timeToLose: 0,
    };
  })
);

useGameStore.subscribe(
  (state) => state.numberToFactorize,
  (numberToFactorize) => {
    useGameStore.setState({
      factors: getFactors(numberToFactorize),
      factorizedInput: "",
    });
  },
  {
    fireImmediately: true,
  }
);

useGameStore.subscribe(
  (state) => state.gameMode,
  (gameMode) => {
    if (gameMode !== gameModes.none) {
      useGameStore.setState({
        factorizedNumbers: 0,
        gameStatus: gameStatuses.playing,
        numberToFactorize: randomNum(),
      });
    }
  }
);

// get fact of numberToFactorize
useGameStore.subscribe(
  (state) => [state.numberToFactorize, state.gameMode],
  ([numberToFactorize, gameMode]) => {
    if (!(gameMode === gameModes.bullet || gameMode === gameModes.free)) return;
    fetch(`/api/fact/${numberToFactorize}`)
      .then((res) => res.json())
      .then(({ fact }) => {
        useGameStore.setState({
          fact,
        });
      })
      .catch(() => {
        useGameStore.setState({
          fact: DEFAULT_FACT,
        });
      });
  },
  {
    equalityFn: shallow,
    fireImmediately: true,
  }
);
