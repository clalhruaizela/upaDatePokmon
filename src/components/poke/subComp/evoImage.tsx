import { useNavigate } from "react-router-dom";

const capitalize = (str: string): string => {
  const [first, ...rest] = str;
  return first.toLocaleUpperCase() + rest.join("");
};

interface PokemonCardProps {
  pokemonId: string;
  speciesName: string;
}

const EvoImageCard: React.FC<PokemonCardProps> = ({
  pokemonId,
  speciesName,
}) => {
  const navigator = useNavigate();

  return (
    <div className="lg:flex lg:justify-center lg:items-center lg:flex-col  lg:basis-1/3 ">
      <div className=" border-4 md:border-8 border-white flex justify-center items-center rounded-full w-28  h-28 md:w-32 md:h-32 lg:h-36 lg:w-36 lg:my-10 ">
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`}
          alt={speciesName}
          onClick={() => {
            window.scrollTo(0, 0);
            navigator(`/pokemon/${pokemonId}`);
          }}
          className="w-20 sm:w-28   "
        />
      </div>
      <div className=" pb-3 flex flex-row md:text-2xl lg:basis-1/3">
        <p>{capitalize(speciesName)}</p>
        <p className="text-gray-500 pl-2">
          #{String(pokemonId).padStart(3, "0")}
        </p>
      </div>
    </div>
  );
};

export default EvoImageCard;
