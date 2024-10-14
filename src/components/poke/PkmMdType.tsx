import { useQuery } from "@tanstack/react-query";
import { PokemonTypesData } from "./pokeType";
import { getTypeColors } from "./utilities/typeColor";

const fetchPokemonType = async (pokemontype: string) => {
  const response = await fetch(
    ` https://pokeapi.co/api/v2/type/${pokemontype} `
  );
  if (!response.ok) {
    throw new Error(`An error occurred:${response.statusText}`);
  }

  return (await response.json()) as PokemonTypesData;
};
const PokemonTypesWeakness = ({ pokemonType }: { pokemonType: string }) => {
  const { isLoading, isError, data } = useQuery({
    queryKey: [pokemonType],
    queryFn: async () => fetchPokemonType(pokemonType),
  });

  const capitalized = (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  if (isLoading) return "Loading...";
  if (isError) return "Error loading ability.";

  const doubleDamageTypes = data?.damage_relations.double_damage_from || [];
  const halfDamageTypes = data?.damage_relations.half_damage_from || [];
  const noDamageTypes = data?.damage_relations.no_damage_from || [];

  const filteredWeaknesses = doubleDamageTypes.filter(
    (type) =>
      !halfDamageTypes.some((halfType) => halfType.name === type.name) &&
      !noDamageTypes.some((notype) => notype.name === type.name)
  );

  //   const calculateWeaknesses = (): string[] => {
  //     return doubleDamageTypes.map((type) => {
  //       const typeWeakness = capitalized(type.name);
  //       console.log("typeWeakness", typeWeakness);

  //       const hasDoubleWeakness = doubleDamageTypes.filter((type) =>
  //         doubleDamageTypes.some((otherType) => otherType.name === type.name)
  //       );

  //       if (hasDoubleWeakness.length > 2) {
  //         return ${typeWeakness} (Deal 4x damage);
  //       }
  //       console.log("hasDoubleWeakness", hasDoubleWeakness);
  //       const isWeakToType = doubleDamageTypes.some(
  //         (type) =>
  //           !noDamageTo.some((noTypeDamage) => noTypeDamage.name === type.name)
  //       );

  //       if (isWeakToType) {
  //         return ${typeWeakness}(Deal 2x damage);
  //       }
  //       const isDoubleFromAndHalfDamageTo = doubleDamageTypes.some((type) =>
  //         halfDamageTo.some((halfDm) => halfDm.name === type.name)
  //       );
  // if (isDoubleFromAndHalfDamageTo) {
  //         return ${typeWeakness};
  //       }
  //       const isHalfDamageFromAndhalfDamageTo = halfDamageTypes.some((type) =>
  //         halfDamageTo.some((half) => half.name === type.name)
  //       );
  //       if (isHalfDamageFromAndhalfDamageTo) {
  //         return "";
  //       }
  //       const isNoDamageFromAndDoubleDamageTo = noDamageTypes.some((type) =>
  //         doubleDamageTo.some((noDb) => noDb.name === type.name)
  //       );
  //       if (isNoDamageFromAndDoubleDamageTo) {
  //         return "";
  //       }
  //       console.log(
  //         "isNoDamageFromAndDoubleDamageTo",
  //         isNoDamageFromAndDoubleDamageTo
  //       );
  //       return ${typeWeakness} (no significant weakness);
  //     });
  //   };
  // const filteredWeaknesses = calculateWeaknesses();

  // console.log("type1", type1Data);
  return (
    <div className="flex flex-row gap-2 sm:px-0 ">
      {filteredWeaknesses.length > 0 ? (
        filteredWeaknesses.map((type, index) => (
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
