import { useQuery } from "@tanstack/react-query";
import { PokemonShapeData } from "../poke";
import { fetchPokemonShape } from "../utilities/utility";

interface PokemonShapeProps {
  shapeId: string;
}

const PokemonShape: React.FC<PokemonShapeProps> = ({ shapeId }) => {
  const {
    data: shapedata,
    isLoading,
    isError,
    error,
  } = useQuery<PokemonShapeData, Error>({
    queryKey: [shapeId],
    queryFn: async () => fetchPokemonShape(shapeId),
  });

  if (isLoading) return <p>Loading shape data...</p>;

  if (isError) return <p>Error: {error?.message}</p>;
  return (
    <div>
      {shapedata && (
        <div>
          <div> {shapedata.name} </div>
          <ul>
            {shapedata.awesome_name?.length ? (
              shapedata.awesome_name.map((nameObj, index) => (
                <li key={index}>
                  {nameObj.language.name}:{nameObj.awesome_name}
                </li>
              ))
            ) : (
              <p>No awesome names available</p>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PokemonShape;
