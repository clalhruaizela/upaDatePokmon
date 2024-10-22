import { useQuery } from "@tanstack/react-query";
import { getFriendshipRating } from "./utilities/utility";

const capitalizeGen = (str: string): string => {
  const [first, ...rest] = str;
  return first.toLocaleUpperCase() + rest.join("");
};
const capitalize = (str: string): string => {
  const updatedStr = str.replace(/-/g, " ");
  return updatedStr
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};
const fetchPokemonSpecies = async (speciesDetails: string) => {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon-species/${speciesDetails}`
    );
    if (!response.ok) {
      throw new Error(`An error occured:${response.statusText}`);
    }

    const pokemonResponse = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${speciesDetails}`
    );
    if (!pokemonResponse.ok) {
      throw new Error(
        `An error occurred while fetching Pokémon data: ${pokemonResponse.statusText}`
      );
    }
    const pokemonData = await pokemonResponse.json();

    const speciesData = await response.json();
    const eggGroups = speciesData.egg_groups || [];
    const eggCycle = speciesData.hatch_counter ?? [];
    const genderRate = speciesData.gender_rate ?? null;
    const habitat = speciesData.habitat?.name || null;
    const generation = speciesData.generation.name || null;
    const baseFriendship = speciesData.base_happiness ?? null;
    const friendShipRating = getFriendshipRating(baseFriendship);
    const catchRate = speciesData.capture_rate ?? null;
    const growthRate = speciesData.growth_rate?.name || null;
    const baseScore = speciesData.base_score ?? null;
    const nameOrigin =
      speciesData.flavor_text_entries.find(
        (entry: { language: { name: string } }) => entry.language.name === "en"
      )?.flavor_text || "Unknown";

    const evYield =
      pokemonData.stats
        .filter((stat) => stat.effort > 0)
        .map((stat) => ({
          stat: stat.stat.name,
          ev: stat.effort,
        })) || [];

    return {
      eggGroups,
      eggCycle,
      genderRate,
      habitat,
      generation,
      baseFriendship,
      friendShipRating,
      catchRate,
      growthRate,
      baseScore,
      nameOrigin,
      evYield,
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
    <div className="h-full w-full ">
      <div className=" ">
        {/* Egg Groups */}

        <div className="grid-cols-6 grid gap-4 mr-4 border-b-2 border-t-2 pt-2 pb-3 ">
          <div className="col-span-6 font-bold text-xl ">Breeding</div>
          <div className="col-span-3 ">
            <div className="font-medium text-">Egg Group</div>
            <div className="border flex flex-row justify-center rounded-sm py-1">
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
          <div className=" col-span-3">
            <div className=" font-medium">Egg Cycle</div>
            <div className="border flex justify-center py-1 rounded-sm">
              {speciesData?.eggCycle !== null ? (
                <div>
                  {speciesData?.eggCycle} ({speciesData?.eggCycle * 256} steps)
                </div>
              ) : (
                <div>Unknown</div>
              )}
            </div>
          </div>
          <div className="col-span-3 mb-4 ">
            {speciesData?.genderRate !== null ? (
              speciesData?.genderRate === -1 ? (
                <div>
                  <div className=" font-medium">Gender</div>
                  <div className="border rounded-sm justify-center py-2">
                    Genderless
                  </div>
                </div>
              ) : (
                <div>
                  <div className=" font-medium">Gender</div>
                  <div className="flex flex-row border rounded-sm justify-center py-2">
                    <p className="text-blue-500">
                      {100 - (speciesData?.genderRate / 8) * 100}% Male
                    </p>
                    ,
                    <p className="text-pink-500">
                      {" "}
                      {(speciesData?.genderRate / 8) * 100}% Female
                    </p>
                  </div>
                </div>
              )
            ) : (
              <div>unknown</div>
            )}
          </div>
        </div>
        <div className="grid grid-cols-6 gap-4 mr-4 border-b-2 py-4">
          <div className="col-span-6 font-bold text-xl">Training</div>
          <div className="col-span-3">
            <div className="font-medium text-lg">Base Friendship</div>
            <div className="border  py-2 rounded-sm flex justify-center">
              {speciesData?.baseFriendship !== null &&
              speciesData?.baseFriendship !== undefined ? (
                <>
                  <div> {speciesData.baseFriendship} </div>
                  <div className="text-gray-500 text-sm py-1">
                    ({speciesData.friendShipRating} )
                  </div>
                </>
              ) : (
                "Unknown"
              )}
            </div>
          </div>
          <div className="col-span-3">
            <div className="font-medium text-lg">Catch Rate</div>
            <div className="border  py-2 rounded-sm flex justify-center">
              {speciesData?.catchRate !== null ? (
                <div className="flex flex-row gap-1">
                  {speciesData?.catchRate}{" "}
                  <p className="text-gray-600">
                    ({((speciesData?.catchRate / 255) * 100).toFixed(2)}% with
                    PokèBall, Full HP)
                  </p>
                </div>
              ) : (
                <div>unknown</div>
              )}
            </div>
          </div>
          <div className="col-span-3">
            <div className="font-medium text-lg">Growth Rate</div>
            <div className="border px-2 py-1 rounded-sm flex justify-center">
              {speciesData?.growthRate ? (
                capitalize(speciesData.growthRate) // This should correctly display the growth rate name
              ) : (
                <div>Unknown</div>
              )}
            </div>
          </div>
          <div className="mb-4 col-span-3">
            <div className="font-medium text-lg">EV Yield</div>
            <div className="border px-2 py-1 rounded-sm flex justify-center">
              {speciesData?.evYield && speciesData.evYield.length > 0 ? (
                speciesData.evYield.map(
                  (ev: { stat: string; ev: number }, index: number) => (
                    <div key={index}>
                      {ev.ev} {capitalize(ev.stat)}
                    </div>
                  )
                )
              ) : (
                <div>Unknown</div>
              )}
            </div>
          </div>
        </div>

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
              ? capitalizeGen(speciesData.generation)
              : "Unknown"}
          </div>
        </div>
        <div className="flex flex-col">
          <div className="font-medium text-lg">Origin</div>
          <div>
            {speciesData?.nameOrigin
              ? capitalize(speciesData.nameOrigin)
              : "Unknown"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PkmMdSpecies;
