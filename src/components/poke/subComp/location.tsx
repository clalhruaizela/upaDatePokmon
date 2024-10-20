import { useQuery } from "@tanstack/react-query";

const capitalize = (str: string): string => {
  const updatedstr = str.replace(/-/g, " ");
  return updatedstr
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const fectPokomonLocation = async (id: number) => {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${id}/encounters`
    );
    if (!response.ok) {
      throw new Error(`An error occured:${response.statusText}`);
    }
    const locationArea = await response.json();
    return locationArea || [];
  } catch (error) {
    console.log("Error fetching Pokemon location:", error);
    throw error;
  }
};
const PokemonLocation = ({ pokemonId }: { pokemonId: number }) => {
  const {
    isLoading,
    isError,
    data: locationArea,
  } = useQuery({
    queryKey: [pokemonId],
    queryFn: async () => fectPokomonLocation(pokemonId),
  });

  if (isError) return "Error";
  if (isLoading) return "Loading...";

  return (
    <div>
      <div className="md: flex justify-center font-medium text-lg">
        Pokemon Location
      </div>
      {locationArea.length > 0 ? (
        <ul className="border w-64 max-h-56 overflow-y-auto space-y-0  px-4 pt-2 pb-4 rounded-sm flex flex-col justify-center ">
          {locationArea.map(
            (location: { location_area: { name: string } }, index: number) => (
              <li className="border-b-2 py-2 flex justify-center" key={index}>
                {" "}
                {capitalize(location.location_area.name)}{" "}
              </li>
            )
          )}
        </ul>
      ) : (
        <div className="border-2 font-semibold px-4 py-2 mt-2  rounded-sm flex flex-col justify-center">
          Unknown Location
        </div>
      )}
    </div>
  );
};

export default PokemonLocation;
