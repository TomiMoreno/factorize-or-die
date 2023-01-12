/* eslint-disable @typescript-eslint/no-empty-function */
import { useEffect, useState, useCallback } from "react";
import { isPrime, getFactors } from "../utils/math";

const randomNum = (limit = 100) => Math.ceil(Math.random() * (limit - 1)) + 1;

interface UseFactorizeProps {
  factorization: string;
  onWin?: () => void;
}
export const useFactorize = ({
  factorization = "",
  onWin,
}: UseFactorizeProps) => {
  const [numberToFactorize, setNumberToFactorize] = useState(randomNum);
  const [factors, setFactors] = useState<number[]>(() =>
    getFactors(numberToFactorize)
  );

  const newNumberToFactorize = useCallback(() => {
    setNumberToFactorize((prevNumber) => {
      let newNumber = prevNumber;
      while (newNumber === prevNumber) {
        newNumber = randomNum();
      }

      setFactors(getFactors(newNumber));
      return newNumber;
    });
  }, []);

  const handleWin = onWin || newNumberToFactorize;

  useEffect(() => {
    const factors = factorization
      .split(" ")
      .join("")
      .split("*")
      .map((factor) => parseInt(factor));

    if (
      factors.some(
        (factor) => !Number.isInteger(factor) || factor > numberToFactorize
      )
    ) {
      return;
    }
    const areFactorsPrime = factors.every(isPrime);
    if (!areFactorsPrime) {
      return;
    }
    const multipliedFactors = factors.reduce((acc, factor) => acc * factor, 1);
    if (multipliedFactors === numberToFactorize) {
      handleWin();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [factorization, numberToFactorize]);

  return {
    numberToFactorize,
    newNumberToFactorize,
    factors,
  };
};
