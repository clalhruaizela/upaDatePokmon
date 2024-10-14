import { useQuery } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import PkmMdAbility from "./PkmMdAbility";
import { useNavigate } from "react-router-dom";
import PkmMdHeight from "./pkmMdHeight";
import { coverToLbs } from "./utilities/utility";
import { Button } from "../ui/button";
import { PokemonData } from "./poke";
import { getTypeColors } from "./utilities/typeColor";
import { convertToFeet } from "./utilities/convertToFeet";
import { Skeleton } from "../ui/skeleton";

const fetchPokemonDetails = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`An error occurred: ${response.statusText}`);
  }
  return (await response.json()) as PokemonData;
};

const PokeCard = ({ pokemonUrl }: { pokemonUrl: string }) => {
  const navigate = useNavigate();

  const { isLoading, isError, data, error } = useQuery({
    queryKey: [pokemonUrl],
    queryFn: async () => fetchPokemonDetails(pokemonUrl),
  });

  const capitalize = (str: string): string => {
    const [first, ...rest] = str;
    return first?.toLocaleUpperCase() + rest.join("");
  };

  // if (isLoading) return "Loading";
  if (isError) return `Error: ${error.message}`;
  // console.log("hh", data);
  return (
    <div className="p-4 md:p-0 rounded-lg  ">
      <Dialog>
        <DialogTrigger>
          <div className="">
            {isLoading ? (
              <div>
                <div className="mb-4">
                  <Skeleton className="h-48 w-full bg-gray-200 rounded-md " />
                </div>
                <div className="pb-2">
                  <Skeleton className="h-6 w-1/3 bg-gray-200 rounded-md " />
                </div>
                <div className="flex flex-row gap-2 ml-6 md:ml-0">
                  <Skeleton className="h-6 w-16 bg-gray-200 rounded-md" />
                  <Skeleton className="h-6 w-16 bg-gray-200 rounded-md" />
                </div>
              </div>
            ) : data ? (
              <div>
                <div>
                  <img
                    src={
                      data.sprites?.other?.["official-artwork"]
                        ?.front_default || ""
                    }
                    alt={data?.name || ""}
                    className="md:mb-4 md:h-48 md:w-full bg-gray-100 rounded-md"
                  />
                </div>
                <div className="w-full">
                  <div>
                    {" "}
                    <span>#{String(data.id).padStart(4, 0)}</span>{" "}
                  </div>
                  <h3 className="text-xl flex pt-2 pb-2 md:pl-0 md:pb-2 justify-start">
                    {capitalize(data?.name || "")}
                  </h3>
                  <div className="flex flex-row  md:ml-0">
                    {data?.types.map((color) => {
                      return (
                        <div key={color.type.name}>
                          <div
                            className={`text-sm bg-white ${getTypeColors(
                              data?.types
                            )}`}
                          >
                            <div
                              className={`ml-1 px-4 rounded-sm ${getTypeColors([
                                color,
                              ])}`}
                            >
                              {capitalize(color.type.name)}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </DialogTrigger>
        <DialogContent>
          {data && ( // JS hman dawn chuan {} null a return ang.. html hman dawn in ()
            <>
              <DialogHeader>
                <DialogTitle> {capitalize(data.name)} ✇</DialogTitle>
                <DialogDescription className="sr-only">
                  {data.name}
                </DialogDescription>
              </DialogHeader>
              <div className=" flex justify-center items-center flex-row text-black">
                <div>
                  <img
                    src={
                      data?.sprites?.other?.["official-artwork"]
                        ?.front_default || ""
                    }
                    alt={data?.name || ""}
                    className="sm:mb-4 w-56 mr-2 h-auto  rounded-md sm:mr-3"
                  />
                </div>
                <div>
                  <div className="flex justify-center  lg:flex-col ">
                    <div className=" bg-blue-400 px-2 w-36 pl-4 sm:pl-8 py-2 sm:w-52 rounded-sm grid grid-cols-6 ">
                      <div className="text-black  col-span-3">
                        <div className=" sm:py-1 text-white">Ability</div>
                        <div className="text-xs sm:text-base">
                          {data?.abilities?.length &&
                            data.abilities.length > 0 && (
                              <PkmMdAbility
                                abilityName={
                                  data?.abilities[0]?.ability?.name || ""
                                }
                              />
                            )}
                        </div>
                      </div>
                      <div className=" col-span-3">
                        <PkmMdHeight pokeUrl={pokemonUrl}>
                          {(data) => (
                            <div>
                              <div>
                                <div className="sm:py-1 pl-2 text-white">
                                  Height
                                </div>
                                <div className="pl-3 text-sm sm:text-base">
                                  {convertToFeet(data?.height)}
                                </div>
                              </div>
                            </div>
                          )}
                        </PkmMdHeight>
                      </div>
                      <div className="col-span-3">
                        <div className="sm:py-1 text-white">Weight</div>
                        <div className="pr-2 text-xs sm:text-base">
                          {coverToLbs(data.weight)}
                        </div>
                      </div>
                      <div className=" col-span-3">
                        <div className="sm:py-1 pl-2   text-white ">Gender</div>
                        <div className="text-sm pl-4 sm:text-base">
                          ♂︎{""}♀{" "}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-full grid gap-2 grid-cols-6">
                    <div className=" col-span-6">
                      <div className="pt-4 pb-2 pl-2 font-bold">Type</div>
                      <div className="flex flex-row">
                        {data!.types.map((color) => {
                          return (
                            <div key={color.type.name}>
                              <div
                                className={`text-sm bg-white ${getTypeColors(
                                  data!.types
                                )}`}
                              >
                                <div
                                  className={`ml-1 px-4 rounded-sm ${getTypeColors(
                                    [color]
                                  )}`}
                                >
                                  {capitalize(color.type.name)}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    <div className="col-span-6">
                      <Button
                        variant={"ghost"}
                        className="w-32 pl-10 sm:pl-10 md:pl- text-xs"
                        onClick={() =>
                          navigate(`/pokemon/${data!.id}`, {
                            state: { pokemon: data },
                          })
                        }
                      >
                        For more details{" "}
                        <p className="font-bold pl-1 ">Click Here</p>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PokeCard;
