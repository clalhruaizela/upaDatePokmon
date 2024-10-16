import { useQuery } from "@tanstack/react-query";
import { Generation, PokemonTypesData, Weakness } from "./pokeType";
import { getTypeColors } from "./utilities/typeColor";
import { useEffect, useRef } from "react";

const fetchPokemonType = async (pokemontype: string) => {
  const response = await fetch(
    ` https://pokeapi.co/api/v2/type/${pokemontype} `
  );
  if (!response.ok) {
    throw new Error(`An error occurred:${response.statusText}`);
  }

  return (await response.json()) as PokemonTypesData;
};
const PokemonTypesWeakness = ({ weakness }: { weakness: Weakness[] }) => {
  // const { isLoading, isError, data } = useQuery({
  //   queryKey: [pokemonType],
  //   queryFn: async () => fetchPokemonType(pokemonType),
  // });

  const capitalized = (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  // // const prevData = useRef<Weakness[]>([]);
  // useEffect(() => {
  //   if (data) {
  //     const doubleDamageTypes = data.damage_relations.double_damage_from || [];

  //     setWeakness((prevWeakness: Weakness[]) => [
  //       ...prevWeakness,
  //       ...doubleDamageTypes,
  //     ]);
  //   }
  // }, [data, setWeakness]);
  // console.log("setDaata",data)
  const reducedTypes = weakness.reduce((acc, type) => {
    if (!acc.some((t) => t.name === type.name)) {
      acc.push(type);
    }
    return acc;
  }, [] as typeof weakness);
  console.log("reduce", weakness);
  console.log("reduceTYPE1", reducedTypes);

  // console.log("data from type", data);
  // if (isLoading) return "Loading...";
  // if (isError) return "Error loading ability.";

  // const doubleDamageTypes = data?.damage_relations.double_damage_from || [];

  return (
    <div className="flex flex-row gap-2 sm:px-0 ">
      {reducedTypes.length > 0 ? (
        reducedTypes.map((type, index) => (
          <div
            className={`${getTypeColors([
              { type },
            ])} px-2 py-2 mt-1 flex rounded-sm w-20 sm:w-36 sm:py-1 justify-center `}
            key={index}
          >
            {capitalized(type.name)}
          </div>
        ))
      ) : (
        <p>No weakness</p>
      )}
    </div>
  );
};
export default PokemonTypesWeakness;
