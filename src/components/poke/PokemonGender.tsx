import { useQuery } from "@tanstack/react-query";
import { Gender } from "./poke";

const fetchPokemonGender = async (id: number) => {
  const response = await fetch(`https://pokeapi.co/api/v2/gender/${id}`);
  if (!response.ok) {
    throw new Error(`An error occurred: ${response.statusText}`);
  }
  return (await response.json()) as Gender;
};
const PokemonGender = ({ genderRateId }: { genderRateId: string }) => {
  const { isLoading, isError, data } = useQuery({
    queryKey: [genderRateId],
    queryFn: async () => fetchPokemonGender(genderRateId),
  });

  if (isLoading) return "Loading Gender...";
  if (isError) return "Error loading Gender.";
  return (
    <div>
      {/* <div>Gender: {data?.name}</div> */}
      <div>
        <ul>
          {data?.pokemon_species_details.map((speciesDetail) => (
            <li key={speciesDetail.pokemon_species.name}>
              {speciesDetail.pokemon_species.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default PokemonGender;
