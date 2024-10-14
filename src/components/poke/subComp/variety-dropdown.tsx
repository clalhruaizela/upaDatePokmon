import { useQuery } from "@tanstack/react-query";

export const fetchPokemonSpecies = async (speciesDetails: string) => {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon-species/${speciesDetails}`
  );
  if (!response.ok) {
    throw new Error(`An error occured:${response.statusText}`);
  }
  return (await response.json()) as PokemonSpeciesData;
};

interface VarietyDropdownProps {
  name: string;
  switchVarient: Function;
}

function VarietyDropdown({ name, switchVarient }: VarietyDropdownProps) {
  const { isLoading, isError, data } = useQuery({
    queryKey: ["species", name],
    queryFn: async () => fetchPokemonSpecies(name),
  });

  return <div>{data && <div>got data macha</div>}</div>;
}

export default VarietyDropdown;
