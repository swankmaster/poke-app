"use client";

import { usePokemonContext } from "@/context/PokemonProvider";
import { useState } from "react";
import Link from "next/link";

interface Pokemon {
  name: string;
  url: string;
  base_experience: number;
  height: number;
  weight: number;
}

export function CapitalizeFirstLetter(str: string): string {
  if (str.length === 0) return str; // Handle empty strings
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export default function PokemonDetail({
  id,
  pokemon,
}: {
  id: string;
  pokemon: Pokemon;
}) {
  const { pokemons } = usePokemonContext();

  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredPokemons = pokemons?.results.filter((pokemon: Pokemon) =>
    pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  // throw new Error();
  return (
    // nav bar
    <div className="flex h-screen">
      <div className="w-64 bg-gray-800 border-l overflow-y-scroll h-screen p-4">
        <h2 className="text-xl font-bold mb-4">Pokémon List</h2>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search Pokemon"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <ul>
          {filteredPokemons?.length ? (
            filteredPokemons.map((p: Pokemon, index: number) => {
              const pokeId = p.url.split("/").filter(Boolean).pop();
              return (
                <li
                  key={index}
                  className={`p-2 ${
                    pokeId === id
                      ? "bg-blue-500 font-bold text-white rounded-md"
                      : "hover:bg-gray-700 text-white rounded-md"
                  }`}
                >
                  <Link href={`/pokemon/${pokeId}`}>
                    {CapitalizeFirstLetter(p.name)}
                  </Link>
                </li>
              );
            })
          ) : (
            <p className="text-gray-400">No Pokémon found...</p>
          )}
        </ul>
      </div>

      {/* pokemon info */}
      <div className="flex-1 flex justify-center items-start p-8">
        {pokemon && (
          <div className="text-center">
            <h1 className="text-3xl font-bold">
              {CapitalizeFirstLetter(pokemon.name)}
            </h1>
            <div className="flex items-center justify-center">
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
              />
            </div>
            <div className="p-8">
              <p>Base Experience: {pokemon.base_experience}</p>
              <p>Height: {pokemon.height}</p>
              <p>Weight: {pokemon.weight}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
