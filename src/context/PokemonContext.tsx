"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

const PokemonContext = createContext<any>(null);

const fetchPokemonList = async () => {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=1302");
  if (!response.ok) {
    throw new Error(`Failed fetch: ${response.statusText}`);
  }
  return response.json();
};

export const PokemonProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [pokemons, setPokemons] = useState<{
    results: { name: string; url: string }[];
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPokemons = async () => {
      if (pokemons) return;
      try {
        const data = await fetchPokemonList();
        setPokemons(data);
      } catch (err: any) {
        setError(err.message);
        console.error("Error fetching Pokemon: ", err);
      }
    };
    fetchPokemons();
  }, [pokemons]);

  return (
    <PokemonContext.Provider value={{ pokemons, setPokemons, error }}>
      {children}
    </PokemonContext.Provider>
  );
};

export const usePokemonContext = () => useContext(PokemonContext);
