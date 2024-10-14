import { useQuery } from "@tanstack/react-query";
import { Ability, PokemonData } from "./poke";

const fetchPokemonAbility = async (id: number | string) => {
  const response = await fetch(`https://pokeapi.co/api/v2/ability/${id}`);
  if (!response.ok) {
    throw new Error(`An error occurred: ${response.statusText}`);
  }
  return (await response.json()) as Ability;

  abilityData.effect_entries = abilityData.effect_entries.filter(
    (entry) => entry.language.name === "en"
  );
  return abilityData;
};
const PokemonAbilityDetail = ({ abilities }: { abilities: string }) => {
  const { isLoading, isError, data } = useQuery({
    queryKey: [abilities],
    queryFn: async () => fetchPokemonAbility(abilities),
  });
  if (isLoading) return "Loading ability...";
  if (isError) return "Error loading ability.";
  return (
    <div>
      {data.effect_entries.length ? (
        data?.effect_entries.map((entry) => (
          <div key={entry.effect}>{entry.effect}</div>
        ))
      ) : (
        <p>No Effect</p>
      )}
    </div>
  );
};
export default PokemonAbilityDetail;
