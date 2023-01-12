import React from "react";
import { useNumberFact } from "../hooks/useNumbersFact";

export default function Fact({
  numberToFactorize,
}: {
  numberToFactorize: number;
}) {
  const fact = " " + useNumberFact(numberToFactorize) + " ";
  const splittedFact = fact.split(` ${numberToFactorize.toString()} `);
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
