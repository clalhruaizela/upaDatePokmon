import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import { typeColors } from "../../utilities/typeColor";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { fetchPokemonGenTwoMove } from "./Utilities";

// const capitalize = (str: string): string => {
//   const updatedstr = str.replace(/-/g, " ");
//   return updatedstr
//     .split(" ")
//     .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
//     .join(" ");
// };

const GenerationOne: React.FC<{ name: string }> = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const pokemonName = searchParams.get("name") || " ";
  const {
    isLoading,
    isError,
    data: pokemonGenOneMove,
  } = useQuery({
    queryKey: [pokemonName, id],
    queryFn: () => fetchPokemonGenTwoMove(pokemonName, ["red-blue", "yellow"]),
    enabled: !!pokemonName && !!id,
  });
  const totalPages = 9;

  const handlePageChange = (page: number) => {
    // alert(page);
    navigate({
      pathname: `/pokemon/${id}/move/${page}`,
      search: `?name=${pokemonName}`,
    });
  };

  const hasLevel = (moves: any[]) =>
    moves.some(
      (move) =>
        (move.redBlueLevel && move.redBlueLevel !== "-") ||
        (move.yellowLevel && move.yellowLevel !== "-")
    );
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
              <TableCell className="">{move.moveName}</TableCell>
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
                  {pokemonName} learns the following moves in Pokémon Red & Blue
                  at the levels specified.
                </div>
                {pokemonGenOneMove?.redBlue?.levelUpMove?.length ? (
                  renderMoveTable(pokemonGenOneMove.redBlue.levelUpMove)
                ) : (
                  <div>
                    This Pokémon cannot learn moves at any level in Red & Blue
                  </div>
                )}
              </div>
              <div className="">
                <div className="text-lg font-bold pt-4">Egg moves</div>
                <div className="py-2">
                  {pokemonGenOneMove?.redBlue.eggMoves &&
                  pokemonGenOneMove.redBlue.eggMoves.length > 0 ? (
                    renderMoveTable(pokemonGenOneMove.redBlue.eggMoves)
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
                {pokemonName} is compatible with these Technical Machines in
                Pokémon Red & Blue:
              </div>
              {pokemonGenOneMove?.redBlue.tmMoves &&
              pokemonGenOneMove.redBlue.tmMoves.length > 0 ? (
                renderMoveTable(pokemonGenOneMove.redBlue.tmMoves)
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
                  {pokemonName} learns the following moves in Pokémon Yellow at
                  the levels specified.
                </p>
                {pokemonGenOneMove?.yellow?.levelUpMove &&
                pokemonGenOneMove.yellow.levelUpMove.length > 0 ? (
                  renderMoveTable(pokemonGenOneMove.yellow.levelUpMove)
                ) : (
                  <div> This pokemon cannot learn move </div>
                )}
              </div>
              <div className="">
                <div className="text-lg font-bold pt-4 pb-2">Egg moves</div>
                <div>
                  {pokemonGenOneMove?.yellow.eggMoves &&
                  pokemonGenOneMove.yellow.eggMoves.length > 0 ? (
                    renderMoveTable(pokemonGenOneMove.yellow.eggMoves)
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
                {pokemonName} is compatible with these Technical Machines in
                Pokémon Yellow:
              </div>
              {pokemonGenOneMove?.yellow.tmMoves &&
              pokemonGenOneMove.yellow.tmMoves.length > 0 ? (
                renderMoveTable(pokemonGenOneMove.yellow.tmMoves)
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
