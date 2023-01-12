import React, { useState } from "react";
import ProgressBar from "../components/ProgressBar";
import { useFactorize } from "../hooks/useFactorize";
import { useNumberFact } from "../hooks/useNumbersApi";
import { LIMIT_PAUSE_TIME } from "../utils/constants";

export default function Game() {
  const [status, setStatus] = useState<"playing" | "win" | "lose">("playing");
  const [factorization, setFactorization] = useState("");
  const { numberToFactorize, newNumberToFactorize } = useFactorize({
    factorization,
    onWin: () => {
      setStatus("win");
      setFactorization("");
      setTimeout(() => {
        newNumberToFactorize();
        setStatus("playing");
      }, LIMIT_PAUSE_TIME);
    },
  });
  const fact = useNumberFact(numberToFactorize);

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
        <div>
          <h2 className="text-5xl font-extrabold leading-normal text-gray-700 md:text-[4rem]">
            {fact}
          </h2>
        </div>
      )}
    </div>
  );
}
