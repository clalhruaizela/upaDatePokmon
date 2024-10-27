import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PokemonData } from "../poke";
import { getTypeColors } from "../utilities/typeColor";

const capitalize = (str: string): string => {
  const [first, ...rest] = str;
  return first.toLocaleUpperCase() + rest.join("");
};

const TypeBadge = ({ type }: { type: { name: string } }) => {
  return (
    <div
      className={`px-2 rounded-md sm:flex flex-row justify-center items-center md:w-24 xl:w-20 xl: ${getTypeColors(
        [{ type }]
      )}`}
    >
      {capitalize(type.name)}
    </div>
  );
};
const fetchEvolutionTrigger = async (evolutionChainUrl: string) => {
  try {
    const response = await fetch(evolutionChainUrl);
    if (!response.ok) {
      throw new Error(`Error fetching evolution chain: ${response.statusText}`);
    }
    const data = await response.json();
    return data.chain; // Return the chain object
  } catch (error) {
    console.error("Error fetching evolution details:", error);
    throw error;
  }
};

export interface PokemonCardProps {
  pokemonId: string;
  speciesName: string;
}

const EvoImageCard: React.FC<PokemonCardProps> = ({
  pokemonId,
  speciesName,
}) => {
  const navigator = useNavigate();
  const [pokemonType, setPokemonType] = useState<PokemonData | null>(null);
  const [evolutionChain, setEvolutionChain] = useState<any[]>([]);
  const [evolutionTrigger, setEvolutionTrigger] = useState<string | null>(null);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
        );
        if (!response.ok) {
          console.error(
            `Error fetching Pokémon details: ${response.statusText}`
          );
          return;
        }
        const pokemonData = await response.json();
        setPokemonType(pokemonData);

        const speciesResponse = await fetch(
          `https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`
        );
        if (!speciesResponse.ok) {
          throw new Error(
            `Error fetching species data: ${speciesResponse.statusText}`
          );
        }
        const speciesData = await speciesResponse.json();

        const evolutionChain = await fetchEvolutionTrigger(
          speciesData.evolution_chain.url
        );
        let evolution = evolutionChain;
        while (evolution && evolution.species.name !== pokemonData.name) {
          evolution = evolution.evolves_to[0];
        }

        const evolutionDetails = evolution?.evolution_details[0] || null;
        const trigger = evolutionDetails?.trigger.name || null;
        const item = evolutionDetails?.item?.name || null;

        setEvolutionTrigger(trigger ? { trigger, item } : null);
      } catch (error) {
        console.error("Error fetching Pokémon details:", error);
      }
    };

    fetchPokemonDetails();
  }, [pokemonId]);

  if (!pokemonType) {
    return <p>Loading Pokémon details...</p>;
  }
  // console.log("pokemon type for evolution", pokemonType);
  return (
    <div className="lg:flex lg:justify-center lg:items-center lg:flex-col  lg:basis-1/3 ">
      <div className="flex justify-center items-center flex-col">
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
            {/* #{String(pokemonId).padStart(3, "0")} */}
          </p>
        </div>
      </div>
      <div className="w-full ">
        {pokemonType && (
          <div className="flex flex-row justify-center items-center gap-1 ">
            {pokemonType.types.map((typeSlot) => (
              <TypeBadge key={typeSlot.type.name} type={typeSlot.type} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EvoImageCard;
