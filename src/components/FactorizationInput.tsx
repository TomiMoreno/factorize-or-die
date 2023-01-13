import React from "react";
import { useGameStore } from "../hooks/useGameStore";

export default function FactorizationInput() {
  const factorization = useGameStore((state) => state.factorizedInput);
  const setFactorization = useGameStore((state) => state.setFactorizedInput);
  return (
    <input
      value={factorization}
      onChange={(e) => setFactorization(e.target.value)}
      className="border-b-2 border-gray-700 text-5xl font-extrabold leading-normal text-gray-700 focus:border-red-700 focus:outline-none md:text-[5rem]"
    />
  );
}
