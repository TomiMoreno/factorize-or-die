import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import { getFactors, isPrime, randomNum } from "../utils/math";
import { gameStatuses, gameModes } from "../utils/types";

interface GameState {
  numberToFactorize: number;
  factors: number[];
  factorizedNumbers: number;
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
    const setNumberToFactorize = (number: number) =>
      set({
        numberToFactorize: number,
      });

    const newNumberToFactorize = () => {
      set(({ numberToFactorize: prevNumber, factorizedNumbers }) => {
        let newNumber = prevNumber;
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
      const factors = input
        .split(" ")
        .join("")
        .split("*")
        .map((factor) => parseInt(factor));

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
        (acc, factor) => acc * factor,
        1
      );
      return multipliedFactors === numberToFactorize;
    };

    return {
      numberToFactorize: randomNum(),
      factors: [],
      factorizedInput: "",
      gameStatus: gameStatuses.playing,
      gameMode: gameModes.none,
      timeToLose: 0,
      factorizedNumbers: 0,
      setNumberToFactorize,
      newNumberToFactorize,
      setFactorizedInput: (factorizedInput) => {
        set(({ numberToFactorize, gameStatus }) => {
          const hasWon = checkWin(factorizedInput, numberToFactorize);
          return {
            factorizedInput,
            gameStatus: hasWon ? gameStatuses.won : gameStatus,
          };
        });
      },
      setGameStatus: (status) => set({ gameStatus: status }),
      setGameMode: (mode) => set({ gameMode: mode }),
      setTimeToLose: (time) => set({ timeToLose: time }),
      setFactorizedNumbers: (number) => set({ factorizedNumbers: number }),
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
        numberToFactorize: randomNum(),
        gameStatus: gameStatuses.playing,
        factorizedNumbers: 0,
      });
    }
  }
);

useGameStore.subscribe(
  (state) => state.gameStatus,
  (gameStatus) => {
    // if (gameStatus === gameStatuses.lost) {
    //   useGameStore.setState({});
    // }
  }
);
