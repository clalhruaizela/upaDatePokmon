import { useQuery } from "@tanstack/react-query";
import { PokemonData, Sprites } from "../poke";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
// Make sure to import your types

// const fetchShinyPokemon = async (name: string) => {
//   const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
//   if (!response.ok) {
//     throw new Error(`An error occurred: ${response.statusText}`);
//   }

//   return (await response.json()) as PokemonData;
// };

const PokemonShiny = ({ pokemonId }: { pokemonId: string | undefined }) => {
  const [sprites, setSprites] = useState<Sprites | null>(null);
  const [showBackSprites, setShowBackSprites] = useState(false);

  useEffect(() => {
    if (pokemonId) {
      const fetchPokemonData = async () => {
        try {
          const response = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
          );
          const data: PokemonData = await response.json();
          setSprites(data.sprites);
        } catch (error) {
          console.error("Error fetching Pokémon data:", error);
        }
      };

      fetchPokemonData();
    }
  }, [pokemonId]);

  if (!sprites) return <div>Loading ....</div>;
  return (
    <div className="flex flex-row  w-full gap-4 justify-center items-center ">
      {showBackSprites ? (
        <div>
          <img
            src={sprites?.back_default}
            alt={pokemonId}
            className="w-40 h-40"
          />
          <img
            src={sprites?.back_shiny}
            alt={pokemonId}
            className="w-40 h-40"
          />
        </div>
      ) : (
        <div>
          <h3></h3>
          <img
            src={sprites?.front_default}
            alt={pokemonId}
            className="w-40 h-40"
          />
          <img
            src={sprites?.front_shiny}
            alt={pokemonId}
            className="w-40 h-40"
          />
        </div>
      )}
      <Button
        variant={"destructive"}
        onClick={() => setShowBackSprites((prev) => !prev)}
      >
        {showBackSprites ? "Show Front Sprites" : "Show Back Sprites"}
      </Button>
    </div>
  );
};

export default PokemonShiny;
