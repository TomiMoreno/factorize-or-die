import React from "react";
import ProgressBar from "../components/ProgressBar";
import { CLASSIC_LIMIT_FACTORIZE_TIME } from "../utils/constants";
import { Button } from "../components/Button";
import { useClassicMode } from "../hooks/useClassicMode";
import { gameStatuses } from "../utils/types";
import FactorizationInput from "../components/FactorizationInput";

export default function Classic() {
  const { gameStatus, numberToFactorize, playAgain, factorizedNumbers } =
    useClassicMode();

  return (
    <div className="flex flex-col items-center justify-center">
      <ProgressBar
        timeToFill={CLASSIC_LIMIT_FACTORIZE_TIME}
        fill={gameStatus === gameStatuses.playing}
      />
      {gameStatus === gameStatuses.playing && (
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-5xl font-extrabold leading-normal text-gray-700 md:text-[5rem]">
            {numberToFactorize}
          </h2>
          <FactorizationInput />
        </div>
      )}
      {gameStatus === gameStatuses.lost && (
        <div className="flex flex-col items-center gap-5">
          <h2 className="text-5xl font-extrabold leading-normal text-gray-700 md:text-[4rem]">
            You factorized {factorizedNumbers} numbers!
          </h2>
          <Button onClick={playAgain}>Play Again</Button>
        </div>
      )}
    </div>
  );
}
