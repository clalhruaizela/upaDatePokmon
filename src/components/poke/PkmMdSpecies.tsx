import { useQuery } from "@tanstack/react-query";
import { fetchPokemonSpecies } from "./utilities/utility";

const capitalize = (str: string): string => {
  const updatedstr = str.replace(/-/g, " ");
  return updatedstr
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" - ");
};

const PkmMdSpecies = ({ speciesDetails }: { speciesDetails: string }) => {
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["species", speciesDetails],
    queryFn: async () => fetchPokemonSpecies(speciesDetails),
  });
  if (isError) {
    console.error("Error fetching species data:", error);
    return (
      <div>
        <div className="font-medium text-lg">Habitat</div>
        <div className="border w-36 px-4 py-1 rounded-sm flex justify-center ">
          Unknown
        </div>
        <div className="pt-4">
          <div className="font-medium text-lg">Generation</div>
          <div className="border w-36 px-4 py-1 rounded-sm flex justify-center ">
            Unknown
          </div>
        </div>
      </div>
    );
  }
  if (isLoading) return "Loading species...";
  return (
    <div className=" h-full w-full  ">
      <div className="flex flex-col ">
        <div className=" flex flex-col">
          <div className="font-medium text-lg">Habitat </div>
          <div className="border w-36 px-4 py-1 rounded-sm flex justify-center ">
            {capitalize(data?.habitat?.name || " Unknown ")}
          </div>
        </div>
        <div className="pt-4">
          <div className="font-medium text-lg">Generation</div>
          <div className="border w-36 px-4 py-1 rounded-sm flex justify-center ">
            {capitalize(data?.generation.name || "Unknown")}
          </div>
        </div>
        <div>
          <p>{capitalize(data?.pokemon_species?.name || "")}</p>
        </div>
      </div>
    </div>
  );
};

export default PkmMdSpecies;
