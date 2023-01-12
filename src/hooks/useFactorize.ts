/* eslint-disable @typescript-eslint/no-empty-function */
import { useEffect, useState, useCallback } from "react";
import { isPrime } from "../utils/math";

const randomNum = (limit = 100) => Math.trunc(Math.random() * limit);

interface UseFactorizeProps {
  factorization: string;
  onWin?: () => void;
}
export const useFactorize = ({
  factorization = "",
  onWin,
}: UseFactorizeProps) => {
  const [numberToFactorize, setNumberToFactorize] = useState(randomNum);

  const newNumberToFactorize = useCallback(() => {
    setNumberToFactorize((prevNumber) => {
      let newNumber = prevNumber;
      while (newNumber === prevNumber) {
        newNumber = randomNum();
      }
      return newNumber;
    });
  }, []);

  const handleWin = onWin || newNumberToFactorize;

  useEffect(() => {
    console.log({ factorization });
    const factors = factorization
      .split(" ")
      .join("")
      .split("*")
      .map((factor) => parseInt(factor));

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
  };
};
