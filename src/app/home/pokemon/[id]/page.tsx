"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { CapitalizeFirstLetter } from "../../page";

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
    <div className="flex flex-col items-center p-8">
      {error && <p>Error: {error}</p>}
      {!pokemon && !error && <p>Loading...</p>}
      {pokemon && (
        <div className="text-center">
          <h1 className="text-3xl font-bold">
            {CapitalizeFirstLetter(pokemon.name)}
          </h1>
          <p>Base Experience: {pokemon.base_experience}</p>
          <p>Height: {pokemon.height}</p>
          <p>Weight: {pokemon.height}</p>
        </div>
      )}
    </div>
  );
}
