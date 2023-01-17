import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useEffect } from "react";
import { useGameStore } from "../hooks/useGameStore";
import { gameModes } from "../utils/types";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { pathname } = useRouter();
  const setGameMode = useGameStore((state) => state.setGameMode);

  useEffect(() => {
    if (pathname === "/classic") setGameMode(gameModes.classic);
    else if (pathname === "/free") setGameMode(gameModes.free);
    else if (pathname === "/bullet") setGameMode(gameModes.bullet);
    else setGameMode(gameModes.none);
  }, [pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <Head>
        <title>Factorize or DIE</title>
        <meta
          name="description"
          content="Factorize or Die is a fun and challenging game where you have to factorize numbers before the time runs out. Choose from three game modes: Bullet, Free, and Classic. Play now and become a factorization master!"
        />
        <meta
          name="keywords"
          content="factorize, prime factors, game, math, education, fun"
        />
        <meta property="og:title" content="Factorize or DIE" />
        <meta
          property="og:description"
          content="Factorize or Die is a fun and challenging game where you have to factorize numbers before the time runs out. Choose from three game modes: Bullet, Free, and Classic. Play now and become a factorization master!"
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://factorize-or-die.vercel.app/"
        />
        <meta
          property="og:image"
          content="https://factorize-or-die.vercel.app/thumbnail.png"
        />
        <meta property="og:image:width" content="512" />
        <meta property="og:image:height" content="512" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:site_name" content="Factorize or DIE" />
        <meta property="og:locale" content="en_US" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@mikebryant_dev" />
        <meta name="twitter:creator" content="@mikebryant_dev" />
        <meta name="twitter:title" content="Factorize or DIE" />
        <meta
          name="twitter:description"
          content="Factorize or Die is a fun and challenging game where you have to factorize numbers before the time runs out. Choose from three game modes: Bullet, Free, and Classic. Play now and become a factorization master!"
        />
        <meta
          name="twitter:image"
          content="https://factorize-or-die.vercel.app/thumbnail.png"
        />

        <link rel="icon" href="/icon-16.png" />
        <link rel="icon" href="/icon-32.png" />
        <link rel="icon" href="/icon-96.png" />
      </Head>

      <main className="container mx-auto flex min-h-screen w-full flex-col items-center justify-start p-4 text-center">
        {pathname !== "/" && (
          <Link href="/">
            <a className="absolute top-8 left-2 text-2xl font-bold leading-normal text-gray-700 transition-colors hover:text-gray-900">
              ⬅️
            </a>
          </Link>
        )}
        <h1 className="mx-4 text-5xl font-extrabold leading-normal text-gray-700 md:text-[5rem]">
          {pathname === "/free" ? (
            <>
              Factorize or{" "}
              <span className="cursor-pointer text-green-700 underline">
                Chill
              </span>
            </>
          ) : (
            <>
              Factorize or{" "}
              <span className="cursor-pointer text-red-700 underline">DIE</span>
            </>
          )}
        </h1>
        {children}
      </main>
    </div>
  );
}
