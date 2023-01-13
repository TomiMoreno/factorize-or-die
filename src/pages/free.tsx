import React from "react";
import { Button } from "../components/Button";
import FactorizationInput from "../components/FactorizationInput";
import { useFreeMode } from "../hooks/useFreeMode";
import Fact from "../components/Fact";
import Keyboard from "../components/Keyboard";
import { gameStatuses } from "../utils/types";

export default function Free() {
  const { numberToFactorize, next, gameStatus } = useFreeMode();

  return (
    <div className="flex flex-col items-center justify-center">
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
          </h2>{" "}
          <Button onClick={next}>Next</Button>
        </div>
      )}
    </div>
  );
}
