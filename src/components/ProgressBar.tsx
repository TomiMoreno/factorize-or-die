import { useEffect, useState } from "react";
import { BULLET_LIMIT_FACTORIZE_TIME } from "../utils/constants";

export default function ProgressBar({
  timeToFill = BULLET_LIMIT_FACTORIZE_TIME,
  fill = false,
}) {
  const [fillBar, setFillBar] = useState(false);
  useEffect(() => {
    setFillBar(fill);
  }, [fill]);

  return (
    <div className="fixed top-0 left-0 z-50 h-2.5 w-full">
      <div
        className={`h-2.5 bg-red-700 dark:bg-red-700 ${
          fillBar ? "w-full" : "w-0"
        }`}
        style={{
          transition: fillBar
            ? `width ${timeToFill}ms cubic-bezier(0, 0, 0.2, 1)`
            : "width 1s",
        }}
      />
    </div>
  );
}
