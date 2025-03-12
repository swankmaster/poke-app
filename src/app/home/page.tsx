import React, { Suspense } from "react";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import LoadingSpinner from "./components/LoadingSpinner";
import ServerPokemonList from "./components/ServerPokemonList";

// const LazyPokemonList = lazy(() => import("@/app/home/components/PokemonList"));

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <ErrorBoundary
          fallback={<p className="text-red-500">Failed to load Pokemon</p>}
        >
          <Suspense fallback={<LoadingSpinner />}>
            <ServerPokemonList />
            {/* <LazyPokemonList /> */}
          </Suspense>
        </ErrorBoundary>
      </main>
    </div>
  );
}
