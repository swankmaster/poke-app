"use client";
import React, { useState, useEffect } from "react";

const getPokemon = async () => {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=1302");
  if (!response.ok) {
    throw new Error(`Failed to fetch: ${response.statusText}`);
  }

  return response.json();
};

function capitalizeFirstLetter(str: string): string {
  if (str.length === 0) return str; // Handle empty strings
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export default function Home() {
  const [pokemons, setPokemons] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const data = await getPokemon();
        setPokemons(data);
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchPokemon();
  }, []);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        {error && <p>Error: {error}</p>}
        {!pokemons && !error && <p>Loading...</p>}
        {/* {pokemons && <p>{JSON.stringify(pokemons.results[0])}</p>} */}
        {pokemons && (
          <ul className="list-outside hover:list-inside" key="pokemon-list">
            {pokemons.results.map(
              (
                p: {
                  url: string | undefined;
                  name: any;
                },
                index: React.Key | null | undefined
              ) => (
                <li
                  key={index}
                  className="whitespace-nowrap hover:bg-slate-800 justify-center text-center rounded-md"
                >
                  <a href={p.url} className="justify-center">
                    {capitalizeFirstLetter(p.name)}
                  </a>
                </li>
              )
            )}
          </ul>
        )}
      </main>
    </div>
  );
}
