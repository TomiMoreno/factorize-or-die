import { useRef, useEffect } from "react";

export const useTimeout = (onTimeOut: () => void, time: number) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => stop();
  }, []);

  const start = () => {
    stop();
    timeoutRef.current = setTimeout(() => {
      onTimeOut();
    }, time);
  };

  const stop = () => {
    timeoutRef.current && clearTimeout(timeoutRef.current);
  };

  const reset = () => {
    stop();
    start();
  };

  return {
    stop,
    reset,
    start,
  };
};
