import { useState, useEffect } from "react";
import { useGameStore } from "./useGameStore";

export const useNumberFact = () => {
  const n = useGameStore((state) => state.numberToFactorize);
  const [fact, setFact] = useState("1 is not prime");

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    const getFact = async () => {
      const { fact: newFact } = await fetch(`/api/fact/${n}`, { signal }).then(
        (res) => res.json()
      );
      if (newFact) setFact(newFact);
    };
    getFact();

    return () => {
      controller.abort();
    };
  }, [n]);
  return fact;
};
