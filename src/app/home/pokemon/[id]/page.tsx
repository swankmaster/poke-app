
import PokemonDetail from "./PokemonDetail";

const getPokemonDetails = async (id: string) => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  console.log(response.ok);
  if (!response.ok) {
    throw new Error(`Failed to fetch: ${response.statusText}`);
  }

  return response.json();
};

export default async function PokemonDetails({ params }: { params: { id: string } }) {
  const pokemon = await getPokemonDetails(params.id as string);

  return <PokemonDetail id={params.id} pokemon={pokemon} />
}
