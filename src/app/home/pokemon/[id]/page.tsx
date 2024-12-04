"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { CapitalizeFirstLetter } from "../../page";
import { usePokemonContext } from "@/context/PokemonContext";

const getPokemonDetails = async (id: string) => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  console.log(response.ok);
  if (!response.ok) {
    throw new Error(`Failed to fetch: ${response.statusText}`);
  }

  return response.json();
};

export default function PokemonDetails() {
  const { id } = useParams();
  const { pokemons } = usePokemonContext();
  const [pokemon, setPokemon] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchDetails = async () => {
      try {
        const data = await getPokemonDetails(id as string);
        setPokemon(data);
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchDetails();
  }, [id]);
  return (
    // nav bar
    <div className="flex h-screen">
      <div className="w-64 bg-gray-800 border-l overflow-y-scroll h-screen p-4">
        <h2 className="text-xl font-bold mb-4">Pokémon List</h2>
        <ul>
          {pokemons?.results?.length ? (
            pokemons.results.map(
              (p: { name: string; url: string }, index: number) => {
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
                    <a href={`/pokemon/${pokeId}`}>
                      {CapitalizeFirstLetter(p.name)}
                    </a>
                  </li>
                );
              }
            )
          ) : (
            <p>Loading Pokémon list...</p>
          )}
        </ul>
      </div>

      {/* pokemon info */}
      <div className="flex-1 flex justify-center items-start p-8">
        {error && <p>Error: {error}</p>}
        {!pokemon && !error && <p>Loading...</p>}
        {pokemon && (
          <div className="text-center">
            <h1 className="text-3xl font-bold">
              {CapitalizeFirstLetter(pokemon.name)}
            </h1>
            <div className="p-8">
              <p>Base Experience: {pokemon.base_experience}</p>
              <p>Height: {pokemon.height}</p>
              <p>Weight: {pokemon.height}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
