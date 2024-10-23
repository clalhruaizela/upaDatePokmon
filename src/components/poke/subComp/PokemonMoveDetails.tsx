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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
    // console.log("Pokemon Data:", pokemonData); // Log Pokemon data
    // console.log("Moves:", pokemonData.moves);

    const moves = await Promise.all(
      pokemonData.moves.map(async (moveEntry: any) => {
        const moveResponse = await fetch(moveEntry.move.url);
        const moveDetails = await moveResponse.json();

        const redBlueDetails = moveEntry.version_group_details.find(
          (versionDetails: any) =>
            versionDetails.version_group.name === "red-blue"
        );
        const yellowDetails = moveEntry.version_group_details.find(
          (versionDetails: any) =>
            versionDetails.version_group.name === "yellow"
        );

        return {
          // category:moveDetails.version_group_details[0].move_learn_category.name,

          moveName: moveEntry.move.name,
          redBlueGeneration: redBlueDetails?.version_group.name || "-",
          redBlueMethod: redBlueDetails?.move_learn_method?.name || "-",
          redBlueLevel: redBlueDetails?.level_learned_at || "-",
          yellowGeneration: yellowDetails?.version_group.name || "-",
          yellowMethod: yellowDetails?.move_learn_method?.name || "-",
          yellowLevel: yellowDetails?.level_learned_at || "-",
          power: moveDetails.power || "-",
          accuracy: moveDetails.accuracy || "-",
          type: moveDetails.type.name,
        };
      })
    );

    const redBlueMoves = moves.filter(
      (move) => move.redBlueGeneration === "red-blue"
    );
    const yellowMoves = moves.filter(
      (move) => move.yellowGeneration === "yellow"
    );

    const redBlueLevelUpMove = redBlueMoves
      .filter((move) => move.redBlueMethod === "level-up")
      .sort((a, b) => {
        if (a.redBlueLevel === "-") return 1;
        if (b.redBlueLevel === "-") return -1;
        return a.redBlueLevel - b.redBlueLevel;
      });
    // console.log("Red Blue Level Up Moves:", redBlueLevelUpMove);
    const redBlueEggMoves = redBlueMoves.filter(
      (move) => move.redBlueMethod === "egg"
    );
    // console.log("Red Blue Egg Moves:", redBlueEggMoves);
    const redBlueTmMoves = redBlueMoves.filter(
      (move) => move.redBlueMethod === "machine"
    );
    // const redBlueHmMoves = redBlueMoves.filter(
    //   (move) => move.redBlueMethod === "hidden-machine"
    // );

    const yellowLevelUpMove = yellowMoves
      .filter((move) => move.yellowMethod === "level-up")
      .sort((a, b) => {
        if (a.yellowLevel === "-") return 1;
        if (b.yellowLevel === "-") return -1;
        return a.yellowLevel - b.yellowLevel;
      });
    const yellowEggMoves = yellowMoves.filter(
      (move) => move.yellowMethod === "egg"
    );
    const yellowTmMoves = yellowMoves.filter(
      (move) => move.yellowMethod === "machine"
    );
    const yellowHmMoves = yellowMoves.filter(
      (move) => move.yellowMethod === "hidden-machine"
    );
    console.log("tm yellow move", yellowTmMoves);
    console.log("Hm yellow move", yellowHmMoves);
    return {
      redBlue: {
        levelUpMove: redBlueLevelUpMove,
        eggMoves: redBlueEggMoves,
        tmMoves: redBlueTmMoves,
        // hmMoves: redBlueHmMoves,
      },
      yellow: {
        levelUpMove: yellowLevelUpMove,
        eggMoves: yellowEggMoves,
        tmMoves: yellowTmMoves,
        // hmMoves: yellowHmMoves,
      },
    };
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
  console.log("redBlue", pokemonMoveData);
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
            <TableCell className="">
              {" "}
              {move.redBlueLevel || move.yellowLevel || "-"}
            </TableCell>
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
    <>
      <Tabs defaultValue="tab1">
        <TabsList>
          <TabsTrigger value="tab1">Red/Blue</TabsTrigger>
          <TabsTrigger value="tab2">Yellow</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">
          <div className="grid grid-cols-6 w-full gap-2">
            <div className="col-span-3">
              <div>
                <div className="text-lg font-bold pt-4">
                  Move learn by level up
                </div>
                <div>
                  {capitalize(name)} learns the following moves in Pokémon Red &
                  Blue at the levels specified.
                </div>
                {pokemonMoveData?.redBlue?.levelUpMove &&
                pokemonMoveData.redBlue.levelUpMove.length > 0 ? (
                  renderMoveTable(pokemonMoveData.redBlue.levelUpMove)
                ) : (
                  <div> This pokemon cannot learn move </div>
                )}
              </div>
              <div className="">
                <div className="text-lg font-bold pt-4">Egg moves</div>
                {pokemonMoveData?.redBlue.eggMoves &&
                pokemonMoveData.redBlue.eggMoves.length > 0 ? (
                  renderMoveTable(pokemonMoveData.redBlue.eggMoves)
                ) : (
                  <div className="pt-2 pb-8">
                    This Pokemon cannot learn any moves by breeding
                  </div>
                )}
              </div>
              {/* <div className="">
                <div className="text-lg font-bold pt-4">Move learn by HM</div>
                {pokemonMoveData?.redBlue.hmMoves &&
                pokemonMoveData.redBlue.hmMoves.length > 0 ? (
                  renderMoveTable(pokemonMoveData.redBlue.hmMoves)
                ) : (
                  <div className="pt-2 pb-8">
                    This Pokemon cannot learn any moves by HM
                  </div>
                )}
              </div> */}
            </div>
            <div className="col-span-3">
              <div className="text-lg font-bold pt-4">Move learn by TM</div>
              <div>
                {capitalize(name)} is compatible with these Technical Machines
                in Pokémon Red & Blue:
              </div>
              {pokemonMoveData?.redBlue.tmMoves &&
              pokemonMoveData.redBlue.tmMoves.length > 0 ? (
                renderMoveTable(pokemonMoveData.redBlue.tmMoves)
              ) : (
                <div className="pt-2 pb-8">
                  This Pokemon cannot be taught any TM moves
                </div>
              )}
            </div>
          </div>
        </TabsContent>
        <TabsContent value="tab2">
          <div className="grid grid-cols-6 w-full gap-2">
            <div className="col-span-3">
              <div>
                <div className="text-lg font-bold pt-4">
                  Move learn by level up
                </div>
                <p>
                  {capitalize(name)} learns the following moves in Pokémon
                  Yellow at the levels specified.
                </p>
                {pokemonMoveData?.yellow?.levelUpMove &&
                pokemonMoveData.yellow.levelUpMove.length > 0 ? (
                  renderMoveTable(pokemonMoveData.yellow.levelUpMove)
                ) : (
                  <div> This pokemon cannot learn move </div>
                )}
              </div>
              {/* <div className="">
                <div className="text-lg font-bold pt-4">Move learn by HM</div>
                {pokemonMoveData?.yellow.hmMoves &&
                pokemonMoveData.yellow.hmMoves.length > 0 ? (
                  renderMoveTable(pokemonMoveData.yellow.hmMoves)
                ) : (
                  <div className="pt-2 pb-8">
                    This Pokemon cannot learn any moves by HM
                  </div>
                )}
              </div> */}
              <div className="">
                <div className="text-lg font-bold pt-4">Egg moves</div>
                {pokemonMoveData?.yellow.eggMoves &&
                pokemonMoveData.yellow.eggMoves.length > 0 ? (
                  renderMoveTable(pokemonMoveData.yellow.eggMoves)
                ) : (
                  <div className="pt-2 pb-8">
                    This Pokemon cannot learn any moves by breeding
                  </div>
                )}
              </div>
            </div>
            <div className="col-span-3">
              <div className="text-lg font-bold pt-4">Move learn by TM</div>
              <div>
                {capitalize(name)} is compatible with these Technical Machines
                in Pokémon Yellow:
              </div>
              {pokemonMoveData?.yellow.tmMoves &&
              pokemonMoveData.yellow.tmMoves.length > 0 ? (
                renderMoveTable(pokemonMoveData.yellow.tmMoves)
              ) : (
                <div className="pt-2 pb-8">
                  This Pokemon cannot be taught any TM moves
                </div>
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </>
  );
};

export default PokemonMoveDetails;
