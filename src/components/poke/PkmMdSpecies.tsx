import { useQuery } from "@tanstack/react-query";

const capitalize = (str: string): string => {
  const [first, ...rest] = str;
  return first.toLocaleUpperCase() + rest.join("");
};

const fetchPokemonSpecies = async (speciesDetails: string) => {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon-species/${speciesDetails}`
    );
    if (!response.ok) {
      throw new Error(`An error occured:${response.statusText}`);
    }
    const speciesData = await response.json();
    const eggGroups = speciesData.egg_groups || [];
    const habitat = speciesData.habitat?.name || null;
    const generation = speciesData.generation.name || null;
    const baseHappiness = speciesData.base_happiness ?? null;
    return {
      eggGroups,
      habitat,
      generation,
      baseHappiness,
    };
  } catch (error) {
    console.error("Error fetching Pokémon species:", error);
    throw error;
  }
};

const PkmMdSpecies = ({ speciesDetails }: { speciesDetails: string }) => {
  const {
    isLoading,
    isError,
    data: speciesData,
  } = useQuery({
    queryKey: ["species", speciesDetails],
    queryFn: async () => fetchPokemonSpecies(speciesDetails),
  });
  // console.log("pokemon species", speciesData);

  if (isError)
    return (
      <div>
        <div>
          <div className="font-medium text-lg">Egg Group</div>
          <div className="border w-40 px-4 py-1 rounded-sm flex justify-center">
            Unknown
          </div>
        </div>
        <div>
          <div className="font-medium text-lg">Habitat</div>
          <div className="border w-40 px-4 py-1 rounded-sm flex justify-center">
            Unknown
          </div>
        </div>
        <div>
          <div className="font-medium text-lg">Generation</div>
          <div className="border w-40 px-4 py-1 rounded-sm flex justify-center">
            Unknown
          </div>
        </div>
        <div>
          <div className="font-medium text-lg">Base Happiness</div>
          <div className="border w-40 px-4 py-1 rounded-sm flex justify-center">
            Unknown
          </div>
        </div>
      </div>
    );
  if (isLoading) return <div>Loading species...</div>;

  return (
    <div className="h-full w-full">
      <div className="flex flex-col">
        {/* Egg Groups */}
        <div className="flex flex-col mb-4">
          <div className="font-medium text-lg">Egg Group</div>
          <div className="border w-40 px-4 py-1 rounded-sm flex justify-center">
            {speciesData?.eggGroups.length > 0 ? (
              speciesData?.eggGroups.map(
                (group: { name: string }, index: number) => (
                  <div key={index}>
                    {capitalize(group.name)}
                    {index < speciesData.eggGroups.length - 1 ? ", " : ""}
                  </div>
                )
              )
            ) : (
              <div>Unknown</div>
            )}
          </div>
        </div>

        {/* Habitat */}
        <div className="flex flex-col mb-4">
          <div className="font-medium text-lg">Habitat</div>
          <div className="border w-40 px-4 py-1 rounded-sm flex justify-center">
            {speciesData?.habitat ? capitalize(speciesData.habitat) : "Unknown"}
          </div>
        </div>

        {/* Generation */}
        <div className="flex flex-col">
          <div className="font-medium text-lg">Generation</div>
          <div className="border w-40 px-4 py-1 rounded-sm flex justify-center">
            {speciesData?.generation
              ? capitalize(speciesData.generation)
              : "Unknown"}
          </div>
        </div>
        <div className="flex flex-col">
          <div className="font-medium text-lg">Base Happiness</div>
          <div className="border w-40 px-4 py-1 rounded-sm flex justify-center">
            {speciesData?.baseHappiness !== null &&
            speciesData?.baseHappiness !== undefined
              ? speciesData.baseHappiness
              : "Unknown"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PkmMdSpecies;
