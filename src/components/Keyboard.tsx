import React from "react";

const KEYS = [7, 8, 9, 4, 5, 6, 1, 2, 3, "*", 0, "🤏"] as const;

type Key = typeof KEYS[number];

interface KeyboardProps {
  onKeyPress?: (key: Key) => void;
}

export default function Keyboard({ onKeyPress }: KeyboardProps) {
  const handleKeyPress =
    (key: Key): React.MouseEventHandler<HTMLButtonElement> =>
    () => {
      onKeyPress?.(key);
    };

  return (
    <div className="fixed bottom-10 grid grid-cols-3 gap-2">
      {KEYS.map((key) => (
        <button
          key={key}
          onClick={handleKeyPress(key)}
          className="rounded bg-gray-500"
        >
          <span className="text-5xl font-bold leading-normal text-gray-100 md:text-[3rem]">
            {key}
          </span>
        </button>
      ))}
    </div>
  );
}
