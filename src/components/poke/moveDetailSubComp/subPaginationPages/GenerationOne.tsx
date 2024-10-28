import { useQuery } from "@tanstack/react-query";
import { capitalize, fetchPokemonMove } from "./Utilities";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs } from "@radix-ui/react-tabs";
import { TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate, useParams } from "react-router-dom";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { typeColors } from "../../utilities/typeColor";

const GenerationOne = () => {
  const { id, name } = useParams<{ id: string; name: string }>();
  const {
    isLoading,
    isError,
    data: pokemonMoveData,
  } = useQuery({
    queryKey: [name],
    queryFn: async () => fetchPokemonMove(name),
  });
  const totalPages = 9;
  const navigate = useNavigate();

  const handlePageChange = (page: number) => {
    // console.log("Current Pokemon Name:", name);
    navigate({
      pathname: `/pokemon/${id}/gen${page}`,
      search: `?name=${name}`,
    });
  };
  console.log("RedBlue", pokemonMoveData?.generation1.redBlue);
  console.log("Yellow", pokemonMoveData?.generation1.yellow);
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
                  {capitalize(name)} learns the following moves in Pokémon
                  Scarlet & Violet at the levels specified.
                </div>
                {pokemonMoveData?.generation1.redBlue?.levelUp &&
                pokemonMoveData.generation1.redBlue.levelUp.length > 0 ? (
                  renderMoveTable(pokemonMoveData.generation1.redBlue.levelUp)
                ) : (
                  <div> This pokemon cannot learn move </div>
                )}
              </div>
              <div className="">
                <div className="text-lg font-bold pt-4">Egg moves</div>
                <div className="py-2">
                  {pokemonMoveData?.generation1.redBlue.egg &&
                  pokemonMoveData.generation1.redBlue.egg.length > 0 ? (
                    renderMoveTable(pokemonMoveData.generation1.redBlue.egg)
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
                in Pokémon Scarlet & Violet:
              </div>
              {pokemonMoveData?.generation1.redBlue.tm &&
              pokemonMoveData.generation1.redBlue.tm.length > 0 ? (
                renderMoveTable(pokemonMoveData.generation1.redBlue.tm)
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
                {pokemonMoveData?.generation1.yellow?.levelUp &&
                pokemonMoveData.generation1.yellow.levelUp.length > 0 ? (
                  renderMoveTable(pokemonMoveData.generation1.yellow.levelUp)
                ) : (
                  <div> This pokemon cannot learn move </div>
                )}
              </div>
              <div className="">
                <div className="text-lg font-bold pt-4 pb-2">Egg moves</div>
                <div>
                  {pokemonMoveData?.generation1.yellow.egg &&
                  pokemonMoveData.generation1.yellow.egg.length > 0 ? (
                    renderMoveTable(pokemonMoveData.generation1.yellow.egg)
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
              {pokemonMoveData?.generation1.yellow.tm &&
              pokemonMoveData.generation1.yellow.tm.length > 0 ? (
                renderMoveTable(pokemonMoveData.generation1.yellow.tm)
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

export default GenerationOne;
