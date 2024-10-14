import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import PokeCard from "./pokeCard";
import { PokemonData } from "./poke";

const SortPokemon = ({ pokemonData }: { pokemonData: PokemonData[] }) => {
  const [sortOption, setSortOption] = useState<string>("");
  const [filterPokemon, setFilterPokemon] = useState<PokemonData[]>([]);

  useState(() => {
    const sortedOption = [...pokemonData];
    console.log("sort Option", sortOption);
    if (sortedOption === "Lowest Number") {
      sortedOption.sort((a, b) => a.id - b.id);
    } else if (sortOption === "Highest Number") {
      sortedOption.sort((a, b) => b.id - a.id);
    }
    setFilterPokemon(sortedOption);
  }, [sortOption, pokemonData]);

  return (
    <div>
      <div className=" lg:py-2 xl:px-2 lg:px-2 w-80 lg:96 lg:pb-8 text-black">
        <div className="  md:pl-4 md:flex md:justify-center lg:flex lg:justify-center md:pt-4">
          <p className="text-gray-400 pt-2 w-20"> Sort By:</p>
          <Select
            value={sortOption || ""}
            onValueChange={(value) => setSortOption(value)}
          >
            <SelectTrigger className="w-full md:w-72 text-black h-6 mt-2 lg:w-[180px]">
              <SelectValue placeholder="Set Sort" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="Lowest Number">
                  Lowest to Highest Number
                </SelectItem>
                <SelectItem value="Highest Number">
                  Highest to Lowest Number
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          {filterPokemon.map((pokemon: PokemonData) => (
            <div key={pokemon.id}>
              <PokeCard pokemonUrl={pokemon.url} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SortPokemon;
