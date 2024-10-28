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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { useNavigate, useParams } from "react-router-dom";

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

        let tmNumber = "-";
        const machine = moveDetails.machines.find(
          (machine: any) =>
            machine.version_group.name === "scarlet-violet" ||
            machine.version_group.name === "yellow"
        );
        if (machine) {
          const machineResponse = await fetch(machine.machine.url);
          const machineData = await machineResponse.json();
          tmNumber = machineData.item.name.toUpperCase().replace("TM", "");
        }

        const scarletVioletDetails = moveEntry.version_group_details.find(
          (versionDetails: any) =>
            versionDetails.version_group.name === "scarlet-violet"
        );
        const yellowDetails = moveEntry.version_group_details.find(
          (versionDetails: any) =>
            versionDetails.version_group.name === "yellow"
        );
        // const;

        return {
          moveName: moveEntry.move.name,
          scarletVioletGeneration:
            scarletVioletDetails?.version_group.name || "-",
          scarletVioletMethod:
            scarletVioletDetails?.move_learn_method?.name || "-",
          scarletVioletLevel: scarletVioletDetails?.level_learned_at || "-",
          yellowGeneration: yellowDetails?.version_group.name || "-",
          yellowMethod: yellowDetails?.move_learn_method?.name || "-",
          yellowLevel: yellowDetails?.level_learned_at || "-",
          power: moveDetails.power || "-",
          accuracy: moveDetails.accuracy || "-",
          type: moveDetails.type.name,
          tmNumber: tmNumber,
        };
      })
    );

    const scarletVioletMoves = moves.filter(
      (move) => move.scarletVioletGeneration === "scarlet-violet"
    );
    const yellowMoves = moves.filter(
      (move) => move.yellowGeneration === "yellow"
    );
    const scarletVioletLevelUpMove = scarletVioletMoves
      .filter((move) => move.scarletVioletMethod === "level-up")
      .sort((a, b) => {
        if (a.scarletVioletLevel === "-") return 1;
        if (b.scarletVioletLevel === "-") return -1;
        return a.scarletVioletLevel - b.scarletVioletLevel;
      });
    // console.log("Red Blue Level Up Moves:", redBlueLevelUpMove);
    const scarletVioletEggMoves = scarletVioletMoves.filter(
      (move) => move.scarletVioletMethod === "egg"
    );
    // console.log("Red Blue Egg Moves:", redBlueEggMoves);
    const scarletVioletTmMoves = scarletVioletMoves.filter(
      (move) => move.scarletVioletMethod === "machine"
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
    // const yellowHmMoves = yellowMoves.filter(
    //   (move) => move.yellowMethod === "hidden-machine"
    // );
    // console.log("tm yellow move", yellowTmMoves);
    // console.log("Hm yellow move", yellowHmMoves);
    return {
      scarletViolet: {
        levelUpMove: scarletVioletLevelUpMove,
        eggMoves: scarletVioletEggMoves,
        tmMoves: scarletVioletTmMoves,
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
/////////
const PokemonMoveDetails = ({ name }: { name: string }) => {
  const {
    isLoading,
    isError,
    data: pokemonMoveData,
  } = useQuery({
    queryKey: [name],
    queryFn: async () => fetchPokemonMove(name),
  });
  const { id } = useParams<{ id: string }>();
  const totalPages = 9;
  const navigate = useNavigate();

  const handlePageChange = (page: number) => {
    // console.log("Current Pokemon Name:", name);
    navigate({
      pathname: `/pokemon/${id}/gen${page}`,
      search: `?name=${name}`,
    });
  };

  const hasLevel = (moves: any[]) =>
    moves.some(
      (move) =>
        (move.redBlueLevel && move.redBlueLevel !== "-") ||
        (move.yellowLevel && move.yellowLevel !== "-")
    );

  // const hasTm = (moves: any[]) =>
  //   moves.some(
  //     (move) =>
  //       (move.redBlueTmMoves && move.redBlueTmMoves !== "-") ||
  //       (move.yellowTmMoves && move.yellowTmMoves !== "-")
  //   );

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error Pokemon Move</div>;

  const renderMoveTable = (moves: any[]) => {
    const showLevelColum = hasLevel(moves);
    // const showTmColum = hasTm(moves);
    return (
      <Table>
        <TableHeader className="bg-orange-200">
          <TableRow>
            {showLevelColum && <TableHead>Lv</TableHead>}
            <TableHead>TM</TableHead>
            <TableHead>Move</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Power</TableHead>
            <TableHead>Acc.</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {moves.map((move) => (
            <TableRow key={move.moveName}>
              {showLevelColum && (
                <TableCell className="">
                  {move.redBlueLevel || move.yellowLevel || ""}
                </TableCell>
              )}
              <TableCell>{move.tmNumber}</TableCell>
              <TableCell className="">{capitalize(move.moveName)}</TableCell>
              <TableCell
                className={`border rounded-md p-2 mt-2 items-center flex justify-center ${
                  typeColors[move.type]
                }`}
              >
                {move.type.charAt(0).toUpperCase() + move.type.slice(1)}{" "}
              </TableCell>
              <TableCell className="">{move.power}</TableCell>
              <TableCell> {move.accuracy} </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  };
  return (
    <div className="mb-8">
      <Tabs defaultValue="tab1">
        <TabsList className="samsungS8:ml-12 iphoneSe:ml-14 md:ml-8 lg:ml-4  ">
          <TabsTrigger value="tab1">Red/Blue</TabsTrigger>
          <TabsTrigger value="tab2">Yellow</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">
          <div className="lg:grid lg:grid-cols-6 w-80 gap-2 iphoneSe:flex iphoneSe:flex-col samsungS8:w-72 samsungS8:ml-12 iphoneSe:ml-14 md:ml-0 md:w-full md:px-8 lg:ml-4  lg:px-0">
            {/* <div className=" "> */}
            <div className="lg:col-span-3 lg:w-11/12 ">
              <div>
                <div className="text-lg font-bold pt-4">
                  Move learn by level up
                </div>
                <div className="py-2 lg:pt-3 lg:pb-1">
                  {capitalize(name)} learns the following moves in Pokémon Red &
                  Blue at the levels specified.
                </div>
                {pokemonMoveData?.scarletViolet?.levelUpMove &&
                pokemonMoveData.scarletViolet.levelUpMove.length > 0 ? (
                  renderMoveTable(pokemonMoveData.scarletViolet.levelUpMove)
                ) : (
                  <div> This pokemon cannot learn move </div>
                )}
              </div>
              <div className="">
                <div className="text-lg font-bold pt-4">Egg moves</div>
                <div className="py-2">
                  {pokemonMoveData?.scarletViolet.eggMoves &&
                  pokemonMoveData.scarletViolet.eggMoves.length > 0 ? (
                    renderMoveTable(pokemonMoveData.scarletViolet.eggMoves)
                  ) : (
                    <div className="pt-2 pb-8">
                      This Pokemon cannot learn any moves by breeding
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="lg:col-span-3 lg:w-11/12 lg:pr-10 xl:pr-4">
              <div className="text-lg font-bold pt-4 ">Move learn by TM</div>
              <div className="py-2 lg:mr-4">
                {capitalize(name)} is compatible with these Technical Machines
                in Pokémon Red & Blue:
              </div>
              {pokemonMoveData?.scarletViolet.tmMoves &&
              pokemonMoveData.scarletViolet.tmMoves.length > 0 ? (
                renderMoveTable(pokemonMoveData.scarletViolet.tmMoves)
              ) : (
                <div className="pt-2 pb-8">
                  This Pokemon cannot be taught any TM moves
                </div>
              )}
            </div>
          </div>
          {/* </div> */}
        </TabsContent>
        <TabsContent value="tab2">
          {/* YELLOW */}
          <div className="lg:grid lg:grid-cols-6 w-80 gap-2 iphoneSe:flex iphoneSe:flex-col samsungS8:w-72 samsungS8:ml-12 iphoneSe:ml-14 md:ml-0 md:w-full md:px-8 lg:ml-4 xl:  lg:px-0  ">
            <div className="lg:col-span-3 lg:w-11/12">
              <div>
                <div className="text-lg font-bold pt-4">
                  Move learn by level up
                </div>
                <p className="lg:pt-3 lg:pb-1">
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
              <div className="">
                <div className="text-lg font-bold pt-4 pb-2">Egg moves</div>
                <div>
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
            </div>
            <div className="lg:col-span-3 lg:w-11/12 lg:pr-10 xl:pr-4 xl:bg- ">
              <div className="text-lg font-bold pt-4 ">Move learn by TM</div>
              <div className="py-2">
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
      <Pagination>
        <PaginationContent>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <PaginationItem key={page}>
              <PaginationLink onClick={() => handlePageChange(page)}>
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default PokemonMoveDetails;
