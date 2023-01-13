import React from "react";
import { useGameStore } from "../hooks/useGameStore";

export default function Fact({ fact }: { fact: string }) {
  const formattedFact = " " + fact + " ";
  const numberToFactorize = useGameStore((state) => state.numberToFactorize);
  const splittedFact = formattedFact.split(` ${numberToFactorize.toString()} `);
  return (
    <h2 className="text-5xl font-extrabold leading-normal text-gray-700 md:text-[4rem]">
      {splittedFact.map((currentLine, index) => (
        <>
          {currentLine}
          {index < splittedFact.length - 1 && (
            <span className="text-red-700">{` ${numberToFactorize} `}</span>
          )}
        </>
      ))}
    </h2>
  );
}
