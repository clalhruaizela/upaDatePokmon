import { useQuery } from "@tanstack/react-query";
import React from "react";

interface GenderProps {
  idOrName: string | number;
}

// Fetch Pokémon species to get gender_rate
const fetchPokemonSpecies = async (idOrName: string | number) => {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon-species/${idOrName}`
    );
    if (!response.ok) {
      throw new Error(`An error occurred: ${response.statusText}`);
    }
    const data = await response.json();
    console.log("Fetched species data for:", idOrName, data); // Log the fetched data for debugging
    return data;
  } catch (error) {
    console.error("Error fetching Pokémon species data:", error);
    throw error;
  }
};

// Calculate gender percentages, with a safeguard against undefined or null genderRate
const calculateGenderPercentage = (genderRate: number | null | undefined) => {
  if (genderRate === undefined || genderRate === null || genderRate === -1) {
    return { malePercentage: 0, femalePercentage: 0 };
  }
  const femalePercentage = genderRate * 12.5;
  const malePercentage = 100 - femalePercentage;
  return { malePercentage, femalePercentage };
};

const PokemonGender: React.FC<GenderProps> = ({ idOrName }) => {
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["pokemonGender", idOrName],
    queryFn: async () => fetchPokemonSpecies(idOrName),
  });

  if (isLoading) return <div>Loading Gender...</div>;

  if (isError) {
    console.error("Error fetching gender data:", error); // Log the error for debugging
    return <div>Error loading Gender.</div>;
  }

  const genderRate = data?.gender_rate;

  // If the gender rate is -1, the Pokémon is genderless
  if (genderRate === -1) {
    return <div>This Pokémon is genderless.</div>;
  }

  // Ensure we don't encounter NaN in percentage calculations
  const { malePercentage, femalePercentage } =
    calculateGenderPercentage(genderRate);

  return (
    <div className="bg-red-400 ">
      <div>Gender</div>
      <div className="flex flex-row gap-2">
        <div className="">
          <strong>Male: </strong>{" "}
          {isNaN(malePercentage) ? "N/A" : malePercentage}%
        </div>
        <div>
          <strong>Female: </strong>{" "}
          {isNaN(femalePercentage) ? "N/A" : femalePercentage}%
        </div>
      </div>
    </div>
  );
};

export default PokemonGender;
