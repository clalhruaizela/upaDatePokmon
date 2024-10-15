import { useQuery } from "@tanstack/react-query";
import { Ability } from "./poke";

const fetchPokemonAbility = async (name: string) => {
  const response = await fetch(`https://pokeapi.co/api/v2/ability/${name}`);
  if (!response.ok) {
    throw new Error(`An error occurred: ${response.statusText}`);
  }
  return (await response.json()) as Ability;
};
const PokemonAbilityDetail = ({ abilitiesPk }: { abilitiesPk: string }) => {
  const { isLoading, isError, data } = useQuery({
    queryKey: [abilitiesPk],
    queryFn: async () => fetchPokemonAbility(abilitiesPk),
  });

  if (isLoading) return "Loading ability...";
  if (isError) return "Error loading ability.";
  return (
    <div>
      {data?.effect_entries.map((entry) => (
        <div key={entry.effect}>
          {entry.language.name === "en" && entry.effect}
        </div>
      ))}
    </div>
  );
};
export default PokemonAbilityDetail;
