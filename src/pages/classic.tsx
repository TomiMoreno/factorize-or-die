import React, { useState } from "react";
import ProgressBar from "../components/ProgressBar";
import { useFactorize } from "../hooks/useFactorize";
import { CLASSIC_LIMIT_FACTORIZE_TIME } from "../utils/constants";
import { Button } from "../components/Button";
import { useTimeout } from "../hooks/useTimeout";
import { useEffect } from "react";
import Keyboard from "../components/Keyboard";

export default function Classic() {
  const [status, setStatus] = useState<"playing" | "win" | "lose">("playing");
  const [factorizedNumbers, setFactorizedNumbers] = useState(0);
  const [factorization, setFactorization] = useState("");
  const { start } = useTimeout(
    () => setStatus("lose"),
    CLASSIC_LIMIT_FACTORIZE_TIME
  );

  const { numberToFactorize, newNumberToFactorize } = useFactorize({
    factorization,
    onWin: () => {
      setFactorizedNumbers(
        (prevFactorizedNumbers) => prevFactorizedNumbers + 1
      );
      setFactorization("");
      newNumberToFactorize();
    },
  });

  const playAgain = () => {
    setFactorization("");
    newNumberToFactorize();
    setStatus("playing");
  };

  useEffect(() => {
    if (status === "playing") start();
  }, [status]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="flex flex-col items-center justify-center">
      <ProgressBar
        timeToFill={CLASSIC_LIMIT_FACTORIZE_TIME}
        fill={status === "playing"}
      />
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
      {status === "lose" && (
        <div className="flex flex-col items-center gap-5">
          <h2 className="text-5xl font-extrabold leading-normal text-gray-700 md:text-[4rem]">
            you factorize {factorizedNumbers} numbers!
          </h2>
          <Button onClick={playAgain}>play again</Button>
        </div>
      )}
    </div>
  );
}
