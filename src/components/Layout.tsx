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
          content="Factorize or DIE is a real serious math game"
        />
        <link rel="icon" href="/favicon.ico" />
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
