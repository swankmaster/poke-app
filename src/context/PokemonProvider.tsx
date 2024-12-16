"use client";

import { createContext, useContext } from "react";

const PokemonContext = createContext<any>(null);
export const usePokemonContext = () => useContext(PokemonContext);

export const PokemonProvider = ({
  pokemons,
  children,
}: {
  children: React.ReactNode;
  pokemons: any[];
}) => {
  return (
    <PokemonContext.Provider value={{ pokemons, error: null }}>
      {children}
    </PokemonContext.Provider>
  );
};
