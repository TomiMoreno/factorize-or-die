import React from "react";
import { useGameStore } from "../hooks/useGameStore";
import { gameModes } from "../utils/types";

export default function Fact() {
  const numberToFactorize = useGameStore((state) => state.numberToFactorize);
  const gameMode = useGameStore((state) => state.gameMode);
  const fact = useGameStore((state) => state.fact);
  const formattedFact = " " + fact + " ";
  const splittedFact = formattedFact.split(` ${numberToFactorize.toString()} `);
  return (
    <h2 className="text-5xl font-extrabold leading-normal text-gray-700 md:text-[4rem]">
      {splittedFact.map((currentLine, index) => (
        <>
          {currentLine}
          {index < splittedFact.length - 1 && (
            <span
              className={`text-${
                gameMode === gameModes.free ? "green" : "red"
              }-700`}
            >{` ${numberToFactorize} `}</span>
          )}
        </>
      ))}
    </h2>
  );
}
