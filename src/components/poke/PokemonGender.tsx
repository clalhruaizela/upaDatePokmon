import { useQuery } from "@tanstack/react-query";
interface Gender {
  id: number;
  name: string;
  pokemon_species_details: Array<{
    pokemon_species: {
      name: string;
    };
  }>;
}

const fetchPokemonGender = async (id: string) => {
  const response = await fetch(`https://pokeapi.co/api/v2/gender/${id}`);
  if (!response.ok) {
    throw new Error(`An error occurred: ${response.statusText}`);
  }
  return (await response.json()) as Gender;
};
const PokemonGender = ({ pokemonGender }: { pokemonGender: Gender[] }) => {
  const { isLoading, isError, data } = useQuery({
    queryKey: [pokemonGender],
    queryFn: async () => {
      const genderId = pokemonGender.map((gender) => gender.id);
      return await Promise.all(genderId.map(fetchPokemonGender));
    },
    enabled: pokemonGender.length > 0,
  });

  const genderIcons = data
    ? data
        .reduce((icons: string[], gender: Gender) => {
          if (gender.name === "male") icons.push("♂️");
          else if (gender.name === "female") icons.push("♀️");
          return icons;
        }, [])
        .join(" & ") || "Unknown"
    : "Unknown";

  // console.log("GenderRATE Id", pokemonGender);
  if (isLoading) return "Loading Gender...";
  if (isError) return "Error loading Gender.";
  return (
    <div>
      <div>{genderIcons}</div>
      {data?.length > 0 ? (
        data?.map((gender) => (
          <div key={gender.id}>
            <h3>{gender.name}</h3>
            <ul>
              {gender.pokemon_species_details.map((species, index) => (
                <li key={index}>{species.pokemon_species.name}</li>
              ))}
            </ul>
          </div>
        ))
      ) : (
        <p>No gender data available</p>
      )}
    </div>
  );
};
export default PokemonGender;
