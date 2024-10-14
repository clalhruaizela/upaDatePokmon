export const typeColors: { [key: string]: string } = {
  normal: "bg-gray-400 text-black", // Light Gray
  fire: "bg-red-600 text-white", // Strong Red
  water: "bg-blue-500 text-white", // Classic Blue
  electric: "bg-yellow-400 text-black", // Bright Yellow
  grass: "bg-green-500 text-white", // Vibrant Green
  ice: "bg-cyan-300 text-black", // Light Blue (Cyan)
  fighting: "bg-red-700 text-white", // Dark Red
  poison: "bg-purple-500 text-white", // Medium Purple
  ground: "bg-yellow-600 text-white", // Yellowish Brown
  flying: "bg-sky-400 text-black", // Sky Blue
  psychic: "bg-pink-500 text-white ", // Bright Pink
  bug: "bg-lime-500 text-black ", // Lime Green
  rock: "bg-yellow-800 text-white", // Dark Yellow/Brown
  ghost: "bg-indigo-700 text-white", // Dark Indigo
  dragon: "bg-indigo-500 text-white", // Royal Purple/Indigo
  dark: "bg-gray-800 text-white", // Very Dark Gray/Black
  steel: "bg-gray-500 text-white", // Medium Gray (Metallic)
  fairy: "bg-pink-300 text-black", // Light Pink
};

export const getTypeColors = (types: { type: { name: string } }[]): string => {
  const primaryType = types[0]?.type.name;
  return typeColors[primaryType] || "bg-gray-200";
};
