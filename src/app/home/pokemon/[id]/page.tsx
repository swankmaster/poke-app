
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

      {/* pokemon info */}
      <table className="table-auto mx-auto border-collapse border border-gray-500">
        <tbody>
          {error && (
            <tr className="border-b border-gray-500">
              <td colSpan={2} className="p-4 text-red-500 text-center">
                Error: {error}
              </td>
            </tr>
          )}
          {!pokemon && !error && (
            <tr className="border-b border-gray-500">
              <td colSpan={2} className="p-4 text-center">
                Loading...
              </td>
            </tr>
          )}
          {pokemon && (
            <>
              {/* Pokémon Name Row */}
              <tr className="border-b border-gray-500">
                <td colSpan={2} className="px-1 py-1 text-center p-4">
                  <h1 className="text-3xl font-bold">
                    {CapitalizeFirstLetter(pokemon.name)}
                  </h1>
                </td>
              </tr>

              {/* Pokémon Image Row */}
              <tr className="border-b border-gray-500">
                <td colSpan={2} className="text-center p-4">
                  <img
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
                    alt={`${CapitalizeFirstLetter(pokemon.name)} Sprite`}
                    className="mx-auto"
                  />
                </td>
              </tr>

              {/* Pokémon Stats Row */}
              <tr>
                <td className="text-center">Base Experience:</td>
                <td className="text-center">{pokemon.base_experience}</td>
              </tr>
              <tr>
                <td className="text-center">Height:</td>
                <td className="text-center">{pokemon.height}</td>
              </tr>
              <tr>
                <td className="text-center">Weight:</td>
                <td className="text-center">{pokemon.weight}</td>
              </tr>
            </>
          )}
        </tbody>
      </table>
    </div>
  );

}
