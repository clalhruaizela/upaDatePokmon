import {
  PokemonData,
  // PokemonShapeData,
  // PokemonSpeciesData,
  PokemonStatSlot,
} from "../poke";

export const coverToLbs = (weightInHectograms: number): string => {
  const weightInKg = weightInHectograms * 0.1;
  const weightInLbs = weightInKg * 2.20462;
  const lbs = Math.floor(weightInLbs);
  const rez = Math.round((weightInLbs - lbs) * 16);
  return `${lbs}.${rez} lbs `;
};

export const fetchPokemonWH = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`An error occurred: ${response.statusText}`);
  }
  return (await response.json()) as PokemonData;
};

export const fetchPokemonStats = async (stat: string) => {
  const response = await fetch(`https://pokeapi.co/api/v2/stat/${stat}`);
  if (!response.ok) {
    throw new Error(`An error occurred: ${response.statusText}`);
  }
  return (await response.json()) as PokemonStatSlot;
};

// export const fetchPokemonShape = async (pokemonShapeDetails: string) => {
//   const response = await fetch(
//     `https://pokeapi.co/api/v2/pokemon-shape/${pokemonShapeDetails}`
//   );
//   if (!response.ok) {
//     throw new Error(`An error occured:${response.statusText}`);
//   }
//   return (await response.json()) as PokemonShapeData;
// };

export const getFriendshipRating = (friendship: number | null): string => {
  if (friendship === null) return "Unknown";
  if (friendship < 50) return "Low";
  if (friendship < 100) return "Normal";
  if (friendship < 150) return "Higher than normal";
  if (friendship <= 255) return "High";
  return "Very High"; // For any unexpected values
};
