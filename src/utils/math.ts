import { PRIMES_UP_TO_100 } from "./constants";
const primes: number[] = [...PRIMES_UP_TO_100];

export function isPrime(n: number): boolean {
  if (Number.isNaN(n)) return false;
  if (n < 2) return false;
  if (n === 2) return true;
  if (primes.includes(n)) return true;
  const lastComputedPrime = Number(primes[primes.length - 1]);
  if (lastComputedPrime > n) return false;

  const limit = Math.sqrt(n);
  // Compute primes up to the square root of n
  calculatePrimesUpTo(limit);

  for (const prime of primes) {
    if (n % prime === 0) return false;
  }

  return true;
}

// TODO: use worker
export const calculatePrimesUpTo = (limit: number) => {
  const lastComputedPrime = Number(primes[primes.length - 1]);
  if (lastComputedPrime > limit) return primes;

  for (let i = lastComputedPrime + 2; i < limit; i += 2) {
    for (const prime of primes) {
      if (i % prime === 0) break;
      if (prime > Math.sqrt(i)) {
        primes.push(i);
        break;
      }
    }
  }

  return primes;
};

export const getFactors = (n: number) => {
  const factors: number[] = [];
  let actual = n;
  if (isPrime(n)) return [n];
  calculatePrimesUpTo(n);
  for (const prime of primes) {
    while (actual % prime === 0) {
      actual = actual / prime;
      factors.push(prime);
    }
    if (actual === 1) break;
  }

  return factors;
};
