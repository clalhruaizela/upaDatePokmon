// import { useQuery } from "@tanstack/react-query";
import { Weakness } from "./pokeType";
import { getTypeColors } from "./utilities/typeColor";

const PokemonTypesWeakness = ({ weakness }: { weakness: Weakness[] }) => {
  const capitalized = (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const reducedTypes = weakness.reduce((acc, type) => {
    if (!acc.some((t) => t.name === type.name)) {
      acc.push(type);
    }
    return acc;
  }, [] as typeof weakness);

  const firstThreeTypes = reducedTypes.slice(0, 3);
  return (
    <div className="flex flex-row gap-2 sm:px-0 ">
      {firstThreeTypes.length > 0 ? (
        firstThreeTypes.map((type, index) => (
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
