import { useQuery } from "@tanstack/react-query";
import { EvolutionChain, EvolutionChainLink, SpeciesData } from "./poke";
import EvoImageCard from "./subComp/evoImage";

//1025 pokemon
const fetchPokemonSpecies = async (pokemonId: number) => {
  // console.log("Fetching species for Pokémon ID:", pokemonId);
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`
  );
  if (!response.ok) {
    throw new Error(`An error occurred: ${response.statusText}`);
  }
  return await response.json(); // This returns the National Dex number
};

const fetchEvolutionChain = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`An error occurred: ${response.statusText}`);
  }
  return await response.json();
};

const PkmEvolution = ({ pokemonSpec }: { pokemonSpec: number }) => {
  const {
    isLoading: speciesLoading,
    isError: speciesError,
    data: speciesData,
  } = useQuery<SpeciesData>({
    queryKey: ["pokemon-species", pokemonSpec],
    queryFn: async () => fetchPokemonSpecies(pokemonSpec),
    retry: 1,
  });
  // const navigator = useNavigate();
  const {
    data: evolutionData,
    isLoading: evolutionLoading,
    isError: evolutionError,
  } = useQuery<EvolutionChain>({
    queryKey: ["evolution-chain", speciesData?.evolution_chain?.url],
    queryFn: () => fetchEvolutionChain(speciesData!.evolution_chain?.url),
    enabled: !!speciesData, // Only run this query if speciesData is available
  });
  // console.log("speciesData", speciesData);
  if (speciesLoading || evolutionLoading) return "Loading evolution...";
  if (speciesError || evolutionError) return "Error loading evolution.";

  const renderEvolutionChain = (chain: EvolutionChainLink) => {
    const { species, evolves_to } = chain;
    const pokemonId = species.url.split("/").slice(-2, -1)[0];
    // console.log("speciesData", pokemonId);
    // const hasEvolution = evolves_to.length > 0;
    return (
      <div
        key={species.name}
        className="sm:flex sm:items-center sm:justify-center sm:w-full lg:flex lg:justify-center lg:items-center lg:mb-2 lg:basis-1/3 lg:pl-4"
      >
        <div className="items-center flex-col lg:flex-row flex lg:basis-1/3 mb-5  lg:justify-evenly  lg:w-full gap-3 text-white sm:ml sm:w-9/12">
          <EvoImageCard pokemonId={pokemonId} speciesName={species.name} />
          {evolves_to.length > 0 && (
            <div className="lg:flex lg:justify-center lg:items-center lg:mt-8 lg:basis-1/3 lg:h-36">
              {evolves_to.map((evolution) => renderEvolutionChain(evolution))}
            </div>
          )}
        </div>
      </div>
    );
  };
  return (
    <div className="sm:w-full  sm:ml-20 md:ml-6   ">
      <div className=" rounded-t-sm mt-5 pt-3 pl-2 bg-red-400 text-white text-2xl sm:w-9/12 md:w-11/12 sm:flex  sm:pl-4 sm:items-center">
        <p>Evolutions</p>
      </div>
      <div className="flex justify-center items-center lg:justify-center w-80 mb-5 rounded-br-sm rounded-bl-3xl bg-red-400  gap-3 text-white sm:ml sm:w-9/12 md:w-11/12 lg:   lg:basis-1/2">
        {renderEvolutionChain(evolutionData!.chain)}
      </div>
    </div>
  );
};

export default PkmEvolution;
