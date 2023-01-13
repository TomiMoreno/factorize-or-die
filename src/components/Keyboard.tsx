import React, { useState } from "react";
import { useGameStore } from "../hooks/useGameStore";
import { shallow } from "zustand/shallow";
import { useIsMobile } from "../hooks/useIsMobile";

const KEYS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0] as const;
const OPERATORS = ["*", "⌫"] as const;

type Key = typeof KEYS[number] | typeof OPERATORS[number];

export default function Keyboard() {
  const { factorizedInput, setFactorizedInput } = useGameStore(
    (state) => ({
      factorizedInput: state.factorizedInput,
      setFactorizedInput: state.setFactorizedInput,
    }),
    shallow
  );
  const isMobile = useIsMobile();
  const [showKeyboard, setShowKeyboard] = useState(() => isMobile);
  const handleKeyPress =
    (key: Key): React.MouseEventHandler<HTMLButtonElement> =>
    () => {
      if (key === "⌫") {
        setFactorizedInput(factorizedInput.slice(0, -1));
      } else {
        setFactorizedInput(`${factorizedInput}${key}`);
      }
    };

  return (
    <>
      <div className="fixed bottom-5 flex flex-col gap-2">
        {showKeyboard && (
          <>
            <div className="flex  flex-wrap justify-center gap-2">
              {KEYS.map((key) => (
                <button
                  key={key}
                  onClick={handleKeyPress(key)}
                  className="rounded bg-gray-500 p-2 text-center text-2xl font-bold leading-normal text-gray-100 transition-colors hover:bg-gray-600 md:text-3xl lg:text-4xl"
                >
                  {key}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap justify-evenly gap-2 px-6">
              <button
                onClick={handleKeyPress("*")}
                className="w-40 rounded bg-gray-500 p-2 text-center text-2xl font-bold leading-normal text-gray-100 transition-colors hover:bg-gray-600 md:text-3xl lg:text-4xl"
              >
                *
              </button>
              <button
                onClick={handleKeyPress("⌫")}
                className="w-40 rounded bg-gray-500 p-2 text-center text-2xl font-bold leading-normal text-gray-100 transition-colors hover:bg-gray-600 md:text-3xl lg:text-4xl"
              >
                ⌫
              </button>
            </div>
          </>
        )}
        <button
          onClick={() => setShowKeyboard((curr) => !curr)}
          // only should be fixed on large screens
          className=" bottom-5 right-5 mx-auto rounded p-2 text-center text-3xl font-bold leading-normal transition-colors hover:bg-gray-100 lg:fixed"
        >
          {showKeyboard ? "❌" : "⌨️"}
        </button>
      </div>
    </>
  );
}
