import { useState, useEffect } from "react";
const NUMBERS_API_URL = "http://numbersapi.com";

export const useNumberFact = (n: number) => {
  const [fact, setFact] = useState("1 is not prime");

  useEffect(() => {
    const getFact = async () => {
      const newFact = await fetch(`${NUMBERS_API_URL}/${n}`).then((res) =>
        res.text()
      );
      if (newFact) setFact(newFact);
    };
    getFact();
  }, [n]);
  return fact;
};
