import React, { useEffect, useRef } from "react";
import { useGameStore } from "../hooks/useGameStore";

export default function FactorizationInput() {
  const factorization = useGameStore((state) => state.factorizedInput);
  const gameStatus = useGameStore((state) => state.gameStatus);
  const setFactorization = useGameStore((state) => state.setFactorizedInput);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    // Spacebar should give '*' as input
    value = value.replace(" ", "*");
    // Only allow numbers and '*' as input
    if (value.match(/^[0-9*]*$/)) {
      setFactorization(value);
    }
  };

  useEffect(() => {
    if (gameStatus === "playing") {
      inputRef.current?.focus();
    }
  }, [gameStatus]);
  return (
    <input
      value={factorization}
      onChange={handleChange}
      className="w-full border-b-2 border-gray-700 text-5xl font-extrabold leading-normal text-gray-700 focus:border-red-700 focus:outline-none md:text-[5rem]"
      ref={inputRef}
    />
  );
}
