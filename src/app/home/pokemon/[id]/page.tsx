import { use } from "react";
import error from "../../error";
import PokemonDetail from "./PokemonDetail";

const getPokemonDetails = async (id: string) => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  console.log(response.ok);
  if (!response.ok) {
    throw new Error(`Failed to fetch: ${response.statusText}`);
  }

  return response.json();
};

export default async function PokemonDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  console.log(await params);
  const id = (await params).id;
  console.log(id);
  const pokemon = await getPokemonDetails(id);

  return <PokemonDetail id={id} pokemon={pokemon} />;
}
