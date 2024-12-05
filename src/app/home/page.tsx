"use client";
import { usePokemonContext } from "@/context/PokemonContext";
import Link from "next/link";
import Image from "next/image";
import React, { useState, useEffect } from "react";

// const getPokemon = async () => {
//   const response = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=1302");
//   if (!response.ok) {
//     throw new Error(`Failed to fetch: ${response.statusText}`);
//   }
//   const data = await response.json();
//   return data;
// };

export function CapitalizeFirstLetter(str: string): string {
  if (str.length === 0) return str; // Handle empty strings
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export default function Home() {
  const { pokemons, error } = usePokemonContext();
  // const [error, setError] = useState<string | null>(null);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        {error && <p>Error: {error}</p>}
        {!pokemons && !error && <p>Loading...</p>}
        {/* {pokemons && <p>{JSON.stringify(pokemons.results[0])}</p>} */}
        {pokemons && (
          <>
            <ul className="list-outside hover:list-inside" key="pokemon-list">
              <Image
                src="/International_Pokémon_logo.svg.png"
                alt="Pokémon Logo"
                width={250} // Specify desired width
                height={100} // Specify desired height
              />

              {pokemons.results.map(
                (
                  p: {
                    url: string | undefined;
                    name: any;
                  },
                  index: React.Key | null | undefined
                ) => {
                  const id = (p.url as string).split("/").filter(Boolean).pop();
                  return (
                    <li
                      key={index}
                      className="whitespace-nowrap hover:bg-slate-800 justify-center text-center rounded-md"
                    >
                      <Link
                        href={`/home/pokemon/${id}`}
                        className="justify-center"
                      >
                        {CapitalizeFirstLetter(p.name)}
                      </Link>
                    </li>
                  );
                }
              )}
            </ul>
          </>
        )}
      </main>
    </div>
  );
}
