import { useQuery } from "@tanstack/react-query";
import { PokemonData } from "./poke";
import { fetchPokemonWH } from "./utilities/utility";

const PkmMdHeight = ({
  pokeUrl,
  children,
}: {
  pokeUrl: string;
  children: (data: PokemonData) => React.ReactNode;
}) => {
  const { isLoading, isError, error, data } = useQuery({
    queryKey: [pokeUrl],
    queryFn: async () => fetchPokemonWH(pokeUrl),
  });

  if (isLoading) return "Loading";
  if (isError) return `Error: ${error.message}`;
  return <div>{data && children(data)}</div>;
};

export default PkmMdHeight;
