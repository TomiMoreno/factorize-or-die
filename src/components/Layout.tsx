import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { pathname } = useRouter();

  return (
    <div>
      <Head>
        <title>Factorize or DIE</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto flex min-h-screen flex-col items-center justify-start p-4">
        <h1 className="text-5xl font-extrabold leading-normal text-gray-700 md:text-[5rem]">
          {pathname === "/free" ? (
            <span>
              Factorize and <span className="text-green-700">Chill</span>
            </span>
          ) : (
            <span>
              Factorize or <span className="text-red-700">DIE</span>
            </span>
          )}
        </h1>
        {children}
      </main>
    </div>
  );
}
