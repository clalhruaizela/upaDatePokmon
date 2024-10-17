import { useQuery } from "@tanstack/react-query";
import { EvolutionChain, SpeciesData } from "../poke";

const usePokemonEvolution = (pokemonSpec: number) => {
  const fetchPokemonSpecies = async (pokemonId: number) => {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`
    );
    if (!response.ok) {
      throw new Error(`An error occurred: ${response.statusText}`);
    }
    return await response.json();
  };

  const fetchEvolutionChain = async (url: string) => {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`An error occurred: ${response.statusText}`);
    }
    return await response.json();
  };

  const {
    data: speciesData,
    isLoading: speciesLoading,
    isError: speciesError,
  } = useQuery<SpeciesData>({
    queryKey: ["pokemon-species", pokemonSpec],
    queryFn: () => fetchPokemonSpecies(pokemonSpec),
    retry: 1,
  });

  const {
    data: evolutionData,
    isLoading: evolutionLoading,
    isError: evolutionError,
  } = useQuery<EvolutionChain>({
    queryKey: ["evolution-chain", speciesData?.evolution_chain?.url],
    queryFn: () => fetchEvolutionChain(speciesData!.evolution_chain?.url),
    enabled: !!speciesData, // Only run this query if speciesData is available
  });

  return {
    speciesData,
    speciesLoading,
    speciesError,
    evolutionData,
    evolutionLoading,
    evolutionError,
  };
};

export default usePokemonEvolution;
