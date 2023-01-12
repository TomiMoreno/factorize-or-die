import React from "react";
import { LIMIT_FACTORIZE_TIME } from "../utils/constants";

export default function ProgressBar({
  timeToFill = LIMIT_FACTORIZE_TIME,
  fill = false,
}) {
  return (
    <div className="fixed top-0 left-0 z-50 h-2.5 w-full">
      <div
        className={`h-2.5 bg-red-700 dark:bg-red-700 ${
          fill ? "w-full" : "w-0"
        }`}
        style={{
          transition: fill
            ? `width ${timeToFill}ms cubic-bezier(0, 0, 0.2, 1)`
            : "width 1s",
        }}
      />
    </div>
  );
}
