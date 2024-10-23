import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import { typeColors } from "../utilities/typeColor";
// import { moveCategory } from "../utilities/utility";

// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const capitalize = (str: string): string => {
  const updatedstr = str.replace(/-/g, " ");
  return updatedstr
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const fetchPokemonMove = async (name: string) => {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    if (!response.ok) {
      throw new Error(`An error occured:${response.statusText}`);
    }
    const pokemonData = await response.json();

    const moves = await Promise.all(
      pokemonData.moves.map(async (moveEntry: any) => {
        const moveResponse = await fetch(moveEntry.move.url);
        const moveDetails = await moveResponse.json();

        const firstGenerationDetails = moveEntry.version_group_details.find(
          (versionDetails: any) =>
            versionDetails.version_group.name === "red-blue" ||
            versionDetails.version_group.name === "yellow"
        );

        if (!firstGenerationDetails) {
          return null;
        }

        return {
          moveName: moveEntry.move.name,
          method:
            moveEntry.version_group_details[0]?.move_learn_method?.name || "-",
          level: moveEntry.version_group_details[0]?.level_learned_at || "-",
          power: moveDetails.power || "-",
          accuracy: moveDetails.accuracy || "-",
          type: moveDetails.type.name,
          // category:moveDetails.version_group_details[0].move_learn_category.name,
          generation: firstGenerationDetails.version_group.name,
        };
      })
    );

    const firstGenMoves = moves.filter((move) => move !== null);

    const levelUpMove = firstGenMoves.filter(
      (move) => move.method === "level-up"
    );
    const eggMoves = firstGenMoves.filter((move) => move.method === "egg");
    const tmMoves = firstGenMoves.filter((move) => move.method === "machine");

    return { levelUpMove, eggMoves, tmMoves };
  } catch (error) {
    console.error("Error", error);
    throw error;
  }
};
const PokemonMoveDetails = ({ name }: { name: string }) => {
  const {
    isLoading,
    isError,
    data: pokemonMoveData,
  } = useQuery({
    queryKey: [name],
    queryFn: async () => fetchPokemonMove(name),
  });
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error Pokemon Move</div>;

  const renderMoveTable = (moves: any[]) => (
    <Table>
      <TableHeader className="bg-red-300">
        <TableRow>
          <TableHead>Lv</TableHead>
          <TableHead>Move</TableHead>
          <TableHead>Type</TableHead>
          {/* <TableHead>Cat.</TableHead> */}
          <TableHead>Power</TableHead>
          <TableHead>Acc.</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {moves.map((move) => (
          <TableRow key={move.moveName}>
            <TableCell className=""> {move.level || "-"} </TableCell>
            <TableCell> {capitalize(move.moveName)} </TableCell>
            <TableCell
              className={`border rounded-md mt-2 p-2 items-center flex justify-center ${
                typeColors[move.type]
              }`}
            >
              {move.type.charAt(0).toUpperCase() + move.type.slice(1)}{" "}
            </TableCell>
            {/* <TableCell className="pl-8">
              {moveCategory[move.category] ? (
                <img
                  src={moveCategory[move.category]}
                  alt={move.category}
                  className="h-4 w-4 mr-2"
                />
              ) : (
                "-"
              )}
              {move.category}
            </TableCell> */}
            <TableCell className="pl-8"> {move.power} </TableCell>
            <TableCell> {move.accuracy} </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  return (
    <div className="grid grid-cols-6 w-full gap-2">
      <div className="col-span-3">
        <div>
          <div className="text-lg font-bold pt-4">Move learn by level up</div>
          {pokemonMoveData?.levelUpMove &&
          pokemonMoveData.levelUpMove.length > 0 ? (
            renderMoveTable(pokemonMoveData.levelUpMove)
          ) : (
            <div> This pokemon cannot learn move </div>
          )}
        </div>
        <div className="">
          <div className="text-lg font-bold pt-4">Egg moves</div>
          {pokemonMoveData?.eggMoves && pokemonMoveData.eggMoves.length > 0 ? (
            renderMoveTable(pokemonMoveData.eggMoves)
          ) : (
            <div className="pt-2 pb-8">
              This Pokemon cannot learn any moves by breeding
            </div>
          )}
        </div>
      </div>
      <div className="col-span-3">
        <div className="text-lg font-bold pt-4">Move learn by TM</div>
        {pokemonMoveData?.tmMoves && pokemonMoveData.tmMoves.length > 0 ? (
          renderMoveTable(pokemonMoveData.tmMoves)
        ) : (
          <div className="pt-2 pb-8">
            This Pokemon cannot be taught any TM moves
          </div>
        )}
      </div>
    </div>
  );
};

export default PokemonMoveDetails;

// {
//   /* <Tabs defaultValue="tab1">
//         <TabsList>
//           <TabsTrigger value="tab1">List 1</TabsTrigger>
//           <TabsTrigger value="tab2">List 2</TabsTrigger>
//         </TabsList>
//         <TabsContent value="tab1">

//         </TabsContent>
//         <TabsContent value="tab2"></TabsContent>

//     </Tabs> */
// }
