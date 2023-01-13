import type { NextPage } from "next";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <main className="mt-4 flex h-full w-full flex-grow flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center space-y-4">
        <Link href="/bullet">
          <a className="text-4xl font-bold text-red-700 hover:text-red-900">
            Bullet
          </a>
        </Link>
        <Link href="/free">
          <a className="text-4xl font-bold text-red-700 hover:text-red-900">
            Free
          </a>
        </Link>
        <Link href="/classic">
          <a className="text-4xl font-bold text-red-700 hover:text-red-900">
            Classic
          </a>
        </Link>
        <Link href="/tutorial">
          <a className="text-4xl font-bold text-red-700 hover:text-red-900">
            Tutorial
          </a>
        </Link>
      </div>
    </main>
  );
};

export default Home;
