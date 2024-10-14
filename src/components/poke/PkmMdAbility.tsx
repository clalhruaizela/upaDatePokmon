import { useQuery } from "@tanstack/react-query";
import { PokemonData } from "./poke";

const fetchPokemonAbility = async (id: number | string) => {
  const response = await fetch(`https://pokeapi.co/api/v2/ability/${id}`);
  if (!response.ok) {
    throw new Error(`An error occurred: ${response.statusText}`);
  }
  return (await response.json()) as PokemonData;
};

const PkmMdAbility = ({ abilityName }: { abilityName: string }) => {
  const { isLoading, isError, data } = useQuery({
    queryKey: [abilityName],
    queryFn: async () => fetchPokemonAbility(abilityName),
  });

  if (isLoading) return "Loading ability...";
  if (isError) return "Error loading ability.";

  // console.log("species", data);
  return (
    <div>
      <div>{data!.name}</div>
    </div>
  );
};

export default PkmMdAbility;
