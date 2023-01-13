import React from "react";
import Link from "next/link";
import { Button } from "../components/Button";
import {
  BULLET_LIMIT_FACTORIZE_TIME,
  CLASSIC_LIMIT_FACTORIZE_TIME,
} from "../utils/constants";

export default function Tutorial() {
  return (
    <>
      <div className="mx-auto max-w-2xl p-4">
        <h1 className="text-2xl font-medium">Welcome to Factorize or Die</h1>
        <p className="mb-4 text-lg">
          In this game, you will be presented with a number to{" "}
          <a
            className="text-red-700 underline"
            href="https://en.wikipedia.org/wiki/Integer_factorization"
            target="_blank"
            rel="noreferrer"
          >
            factorize into its prime factors.
          </a>{" "}
          There are three game modes to choose from:
        </p>
        <div className="mb-4">
          <h2 className="text-xl font-medium">Bullet</h2>
          <p className="text-base">
            You have {BULLET_LIMIT_FACTORIZE_TIME / 1000} seconds to factorize
            each number.
          </p>
        </div>
        <div className="mb-4">
          <h2 className="text-xl font-medium">Free</h2>
          <p className="text-base">There is no time limit.</p>
        </div>
        <div className="mb-4">
          <h2 className="text-xl font-medium">Classic</h2>
          <p className="text-base">
            You have {CLASSIC_LIMIT_FACTORIZE_TIME / 1000} seconds to factorize
            as many numbers as you can.
          </p>
        </div>
        <p className="mb-4 text-lg">
          The format for the answers is a multiplication of prime numbers using
          (*) or (**) character for exponents.
        </p>
        <p className="mb-4 text-lg">
          For example, if the number is 12, the answer would be
          &quot;2*2*3&quot;. Or &quot;2**2*3&quot; if you want to use exponents
        </p>
        <Link href="/">
          <Button>Start Playing</Button>
        </Link>
      </div>
    </>
  );
}
