import { useQuery } from "@tanstack/react-query";
import { capitalize, fetchPokemonDetails, fetchPokemonMove } from "./Utilities";
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
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { typeColors } from "../../utilities/typeColor";
import Layout from "@/components/ui/Layout/layout";

const GenerationOne = () => {
  const [searchParams] = useSearchParams();
  const pokemonName = searchParams.get("name") ?? "";
  // const generation = searchParams.get("generation") ?? "";
  const id = useParams<{ id: string }>();

  const {
    isLoading,
    isError,
    data: pokemonMoveData,
  } = useQuery({
    queryKey: [pokemonName],
    queryFn: async () => fetchPokemonMove(pokemonName!),
  });

  const { data: pokemonDetails, isLoading: isDetailsLoading } = useQuery({
    queryKey: [pokemonName, "details"],
    queryFn: () => fetchPokemonDetails(pokemonName),
  });

  const totalPages = 9;
  const navigate = useNavigate();

  // console.log("Current Pokemon Name:", pokemonName);
  const handlePageChange = (page: number) => {
    navigate({
      pathname: `/pokemon/${id}/gen${page}`,
      search: `?name=${pokemonName}`,
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

  if (isLoading || isDetailsLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching Pokémon Move data</div>;

  const renderMoveTable = (moves: any[]) => {
    const showLevelColum = hasLevel(moves);
    // const showTmColum = hasTm(moves);
    return (
      <Table>
        <TableHeader className="bg-orange-200 ">
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
    <Layout>
      <div className="mb-8 ">
        <div className="xxl:w-8/12 xxl:flex xxl:justify-center xxl:items-center xxl:flex-col xxl:ml-96">
          <div className="iphoneSe:text-3xl md:text-5xl xs:text-2xl text-lg xs:flex-row px-3 samsungS8:text-2xl xl:text-5xl gap-1 flex samsungS8:flex-col justify-center items-center py-4 font-bold">
            {capitalize(pokemonName)} - Generation 1 <p>Learnset</p>
          </div>
          <div className="w-full lg:flex lg:flex-row lg:justify-center lg:w-11/12 lg:ml-12 xxl:ml-6 ">
            <div className="samsungS8:pl-10 lg:pl-0 lg:gap-4 lg:text-lg pixel7:mx-0 pixel7:w-full lg:pr-0  md:w-full md:pl-12 iphoneSe:w-96 iphoneSe:pl-4 xs:pl-8 samsungS8:w-full samsungS8:px-8 iphone12Pro:px-10 xxl:ml-14">
              <div>
                This page lists all the moves that {pokemonName} can learn in
                Generation 1, which consists of these games:
              </div>
              <ul className="lg:font-bold  py-2 pl-4">
                <li>Pokemon Red</li>
                <li>Pokemon Blue</li>
                <li>Pokemon Yellow</li>
              </ul>
              <div className="xxl:pr-28">
                Note: many moves have changed stats over the years. The power,
                accuracy and other information listed below is as it was in the
                respective games. Check a move's detail page for stats in the
                most recent games and when they changed.
              </div>
            </div>
            <div className="md:flex md:flex-col md:justify-center md:items-center surfaceDuo:ml-20 ">
              <div className=" w-80  md:w-96 lg:w-80 xxl:mr-14 lg:ml-0 xxl:ml-0 ml-4 iphoneSe:ml-10  samsungS8:ml-10 ">
                <img
                  className="w-64 h-60 md:w-96 md:h-96 "
                  src={
                    pokemonDetails.sprites?.other?.["official-artwork"]
                      ?.front_default
                  }
                  alt={pokemonDetails.name || ""}
                />
              </div>
              <div className="w-80 pl-10 xxl:mr-16 xxl:pl-0">
                <button
                  className="font-bold pb-4 text-blue-600  hover:text-blue-400"
                  onClick={() => {
                    window.scrollTo(0, 0);
                    navigate(-1);
                  }}
                >
                  ◁ back to {capitalize(pokemonName)} Pokedex{" "}
                </button>
              </div>
            </div>
          </div>
          <div className=" w-full flex justify-center  ">
            <div className="md:bg-blue-200 md:w-11/12 xxl:mx-32 ">
              <Pagination className="bg-blue-200  py-1 rounded-md w-full   ">
                <p className="hidden md:justify-center md:items-center md:flex md:flex-row md:font-bold  ">
                  In other generation
                </p>
                <PaginationContent>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <PaginationItem
                        className="flex justify-center items-center "
                        key={page}
                      >
                        <PaginationLink
                          className="px-2 py-1 rounded text-sm hover:bg-blue-300 "
                          onClick={() => handlePageChange(page)}
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    )
                  )}
                </PaginationContent>
              </Pagination>
            </div>
          </div>
          <Tabs defaultValue="tab1">
            <TabsList className="samsungS8:ml-12 surfaceDuo:ml-10 iphoneSe:ml-4 md:ml-8 lg:ml-10 mt-4   ">
              <TabsTrigger value="tab1">Red/Blue</TabsTrigger>
              <TabsTrigger value="tab2">Yellow</TabsTrigger>
            </TabsList>
            <TabsContent value="tab1">
              <div className="lg:grid lg:grid-cols-6  pixel7:w-80 xs:w-96 ml-4 xs:mx-20 iphone14:mx-4 w-80 gap-2 surfaceDuo:w-10/12 surfaceDuo:ml-10 iphoneSe:flex iphoneSe:flex-col samsungS8:w-72 samsungS8:ml-12 iphoneSe:ml-10 md:ml-0 md:w-full md:px-8 lg:ml-10  lg:px-0 ">
                {/* <div className=" "> */}
                <div className="lg:col-span-3 w-full bg-red-400  ">
                  <div>
                    <div className="text-lg font-bold pt-4">
                      Move learn by level up
                    </div>
                    <div className="py-2 lg:pt-3 lg:pb-1">
                      {capitalize(pokemonName!)} learns the following moves in
                      Pokémon Scarlet & Violet at the levels specified.
                    </div>
                    {pokemonMoveData?.redBlue?.levelUp &&
                    pokemonMoveData.redBlue.levelUp.length > 0 ? (
                      renderMoveTable(pokemonMoveData.redBlue.levelUp)
                    ) : (
                      <div> This pokemon cannot learn move </div>
                    )}
                  </div>
                  <div className="">
                    <div className="text-lg font-bold pt-4">Egg moves</div>
                    <div className="py-2">
                      {pokemonMoveData?.redBlue.egg &&
                      pokemonMoveData.redBlue.egg.length > 0 ? (
                        renderMoveTable(pokemonMoveData.redBlue.egg)
                      ) : (
                        <div className="pt-2 pb-8">
                          This Pokemon cannot learn any moves by breeding
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="lg:col-span-3 lg:w-full bg-red-400 ">
                  <div className="text-lg font-bold pt-4 ">
                    Move learn by TM
                  </div>
                  <div className="py-2  ">
                    {capitalize(pokemonName!)} is compatible with these
                    Technical Machines in Pokémon Scarlet & Violet:
                  </div>
                  {pokemonMoveData?.redBlue.tm &&
                  pokemonMoveData.redBlue.tm.length > 0 ? (
                    renderMoveTable(pokemonMoveData.redBlue.tm)
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
              <div
                className="lg:grid  lg:grid-cols-6 lg:w-full pixel7:w-80 xs:w-96 ml-4 xs:mx-20 iphone14:mx-4 w-80 gap-2 surfaceDuo:w-10/12
               surfaceDuo:ml-10 iphoneSe:flex iphoneSe:flex-col samsungS8:w-72 samsungS8:ml-12 iphoneSe:ml-10 md:ml-0 md:w-full 
               md:px-8 lg:ml-10  lg:  bg-blue-300  "
              >
                <div className="lg:col-span-3 bg-yellow-400 w-full">
                  <div>
                    <div className="text-lg font-bold pt-4">
                      Move learn by level up
                    </div>
                    <div className="py-2 lg:pt-3 lg:pb-1">
                      {capitalize(pokemonName!)} learns the following moves in
                      Pokémon Yellow at the levels specified.
                    </div>
                    {pokemonMoveData?.yellow?.levelUp &&
                    pokemonMoveData.yellow.levelUp.length > 0 ? (
                      renderMoveTable(pokemonMoveData.yellow.levelUp)
                    ) : (
                      <div> This pokemon cannot learn move </div>
                    )}
                  </div>
                  <div className="">
                    <div className="text-lg font-bold pt-4 pb-2">Egg moves</div>
                    <div>
                      {pokemonMoveData?.yellow.egg &&
                      pokemonMoveData.yellow.egg.length > 0 ? (
                        renderMoveTable(pokemonMoveData.yellow.egg)
                      ) : (
                        <div className="pt-2 pb-8">
                          This Pokemon cannot learn any moves by breeding
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="lg:col-span-3 lg:w-full  bg-yellow-300 ">
                  <div className="text-lg font-bold pt-4 ">
                    Move learn by TM
                  </div>
                  <div className="py-2 lg:w-full  ">
                    {capitalize(pokemonName!)} is compatible with these
                    Technical Machines in Pokémon Yellow:
                  </div>
                  {pokemonMoveData?.yellow.tm &&
                  pokemonMoveData.yellow.tm.length > 0 ? (
                    renderMoveTable(pokemonMoveData.yellow.tm)
                  ) : (
                    <div className="pt-2 pb-8">
                      This Pokemon cannot be taught any TM moves
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default GenerationOne;
