import React, { useState } from "react";
import { useFactorize } from "../hooks/useFactorize";
import { Button } from "../components/Button";
import { useNumberFact } from "../hooks/useNumbersFact";
import Keyboard from "../components/Keyboard";

export default function Free() {
  const [status, setStatus] = useState<"playing" | "win">("playing");
  const [factorization, setFactorization] = useState("");
  const { numberToFactorize, newNumberToFactorize } = useFactorize({
    factorization,
    onWin: () => {
      setStatus("win");
    },
  });
  const fact = " " + useNumberFact(numberToFactorize) + " ";
  const splittedFact = fact.split(` ${numberToFactorize.toString()} `);

  const next = () => {
    setFactorization("");
    newNumberToFactorize();
    setStatus("playing");
  };

  return (
    <div className="flex flex-col items-center justify-center">
      {status === "playing" && (
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-5xl font-extrabold leading-normal text-gray-700 md:text-[5rem]">
            {numberToFactorize}
          </h2>
          <input
            value={factorization}
            onChange={(e) => setFactorization(e.target.value)}
            className="border-b-2 border-gray-700 text-5xl font-extrabold leading-normal text-gray-700 focus:border-red-700 focus:outline-none md:text-[5rem]"
          />
          <Keyboard
            onKeyPress={(key) => {
              if (key === "🤏") {
                setFactorization((prevFactorization) =>
                  prevFactorization.slice(0, -1)
                );
              } else {
                setFactorization(
                  (prevFactorization) => `${prevFactorization}${key}`
                );
              }
            }}
          />
        </div>
      )}
      {status === "win" && (
        <div className="flex flex-col items-center gap-5">
          <h2 className="text-5xl font-extrabold leading-normal text-gray-700 md:text-[4rem]">
            {splittedFact.map((currentLine, index) => (
              <>
                {currentLine}
                {index < splittedFact.length - 1 && (
                  <span className="text-red-700">{` ${numberToFactorize} `}</span>
                )}
              </>
            ))}
          </h2>{" "}
          <Button onClick={next}>Next</Button>
        </div>
      )}
    </div>
  );
}
