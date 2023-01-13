import React from "react";
import ProgressBar from "../components/ProgressBar";
import { useBulletMode } from "../hooks/useBulletMode";
import { Button } from "../components/Button";
import Fact from "../components/Fact";
import FactorizationInput from "../components/FactorizationInput";
import { gameStatuses } from "../utils/types";
import Keyboard from "../components/Keyboard";

export default function Bullet() {
  const { numberToFactorize, next, tryAgain, factors, gameStatus } =
    useBulletMode();

  return (
    <div className="flex flex-col items-center justify-center">
      <ProgressBar fill={gameStatus === gameStatuses.playing} />
      {gameStatus === gameStatuses.playing && (
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-5xl font-extrabold leading-normal text-gray-700 md:text-[5rem]">
            {numberToFactorize}
          </h2>
          <FactorizationInput />
          <Keyboard />
        </div>
      )}
      {gameStatus === gameStatuses.won && (
        <div className="flex flex-col items-center gap-5">
          <h2 className="text-5xl font-extrabold leading-normal text-gray-700 md:text-[4rem]">
            <Fact />
          </h2>
          <Button onClick={next}>Next</Button>
        </div>
      )}
      {gameStatus === gameStatuses.lost && (
        <div className="flex flex-col items-center gap-5">
          <h2 className="text-5xl font-extrabold leading-normal text-gray-700 md:text-[4rem]">
            You lose
          </h2>
          <h2 className="text-5xl font-extrabold leading-normal text-gray-700 md:text-[4rem]">
            The answer was: {factors.join("*")}
          </h2>
          <Button onClick={tryAgain}>Try Again</Button>
        </div>
      )}
    </div>
  );
}
