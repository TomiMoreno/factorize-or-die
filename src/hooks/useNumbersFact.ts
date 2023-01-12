import { useState, useEffect } from "react";

export const useNumberFact = (n: number) => {
  const [fact, setFact] = useState("1 is not prime");

  useEffect(() => {
    const getFact = async () => {
      const { fact: newFact } = await fetch(`/api/fact/${n}`).then((res) =>
        res.json()
      );
      if (newFact) setFact(newFact);
    };
    getFact();
  }, [n]);
  return fact;
};
