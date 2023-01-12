import React, { useState } from "react";
import ProgressBar from "../components/ProgressBar";
import { useFactorize } from "../hooks/useFactorize";
import { useNumberFact } from "../hooks/useNumbersFact";
import { LIMIT_FACTORIZE_TIME } from "../utils/constants";
import { Button } from "../components/Button";
import { useTimeout } from "../hooks/useTimeout";
import { useEffect } from "react";

export default function Game() {
  const [status, setStatus] = useState<"playing" | "win" | "lose">("playing");
  const [factorization, setFactorization] = useState("");
  const { start, stop } = useTimeout(
    () => setStatus("lose"),
    LIMIT_FACTORIZE_TIME
  );
  const { numberToFactorize, newNumberToFactorize } = useFactorize({
    factorization,
    onWin: () => {
      setStatus("win");
      setFactorization("");
    },
  });
  const fact = " " + useNumberFact(numberToFactorize) + " ";
  const splittedFact = fact.split(` ${numberToFactorize.toString()} `);

  const tryAgain = () => {
    setFactorization("");
    newNumberToFactorize();
    setStatus("playing");
  };

  const next = () => {
    newNumberToFactorize();
    setStatus("playing");
  };

  useEffect(() => {
    if (status === "playing") start();
    if (status === "win") stop();
  }, [status]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="flex flex-col items-center justify-center">
      <ProgressBar fill={status === "playing"} />
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
          </h2>
          <Button onClick={next}>Next</Button>
        </div>
      )}
      {status === "lose" && (
        <div className="flex flex-col items-center gap-5">
          <h2 className="text-5xl font-extrabold leading-normal text-gray-700 md:text-[4rem]">
            You lose
          </h2>
          <Button onClick={tryAgain}>Try Again</Button>
        </div>
      )}
    </div>
  );
}
