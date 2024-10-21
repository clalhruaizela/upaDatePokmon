import Layout from "@/components/ui/Layout/layout";
import PkmMdAbility from "../PkmMdAbility";
import { useQuery } from "@tanstack/react-query";
import { coverToLbs } from "../utilities/utility";
import { useNavigate, useParams } from "react-router-dom";
import PokemonChartDT from "../PkmChart";
import PkmMdHeight from "../pkmMdHeight";
import PokemonTypesWeakness from "../PkmMdType";
import { PokemonData } from "../poke";
import { getTypeColors } from "../utilities/typeColor";
import { convertToFeet } from "../utilities/convertToFeet";
import PkmEvolution from "../PkmEvolution";
import { Button } from "@/components/ui/button";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import { IoIosArrowDroprightCircle } from "react-icons/io";
// import { Skeleton } from "@/components/ui/skeleton";
import PkmMdSpecies from "../PkmMdSpecies";
import PokemonVariety from "../subComp/pokemonVariety";
import { useEffect, useState } from "react";
import { PokemonTypesData, Weakness } from "../pokeType";
import PokemonShiny from "../subComp/PokemonShiny";
import GrowthRates from "../subComp/GrowthRate";
import PokemonLocation from "../subComp/location";
import PokemonGender from "../PokemonGender";

const fetchPokemonDetails = async (id: number) => {
  const url = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);

  if (!url.ok) {
    throw new Error(`An error occurred: ${url.statusText}`);
  }
  return (await url.json()) as PokemonData;
};
const fetchPokemonType = async (pokemontype: string) => {
  const response = await fetch(
    ` https://pokeapi.co/api/v2/type/${pokemontype} `
  );
  if (!response.ok) {
    throw new Error(`An error occurred:${response.statusText}`);
  }

  return (await response.json()) as PokemonTypesData;
};

const fetchGrowthRate = async (idOrName: string) => {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/growth-rate/${idOrName}/`
    );

    if (!response.ok) {
      throw new Error(`Error fetching growth rate: ${response.statusText}`);
    }

    const growthRateData = await response.json();
    console.log("Fetched Growth Rate Data:", growthRateData);

    return growthRateData;
  } catch (error) {
    console.error("Failed to fetch growth rate data:", error);
    return null;
  }
};

const capitalize = (str: string): string => {
  const updatedstr = str.replace(/-/g, " ");
  return updatedstr
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const MAX_POKEMON_ID = 1025;
const MIN_POKEMON_ID = 1;

const PokemonPageID = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  // const pokemonId = parseInt(id!);
  const currentId = parseInt(id!);
  const [weakness, setWeakness] = useState<Weakness[]>([]);
  const { isLoading, isError, data } = useQuery({
    queryKey: [id],
    queryFn: async () => {
      if (id) {
        return fetchPokemonDetails(currentId);
      }
    },
    retry: 0,
    enabled: !!id,
  });

  const [pokemonVarient, setPokemonVarient] = useState<PokemonData | null>(
    null
  );
  const [growthRate, setGrowthRate] = useState<string | null>(null);
  const prevId = currentId === MIN_POKEMON_ID ? MAX_POKEMON_ID : currentId - 1;
  const nextId = currentId === MAX_POKEMON_ID ? MIN_POKEMON_ID : currentId + 1;

  const { data: prevPokemon } = useQuery({
    queryKey: [prevId],
    queryFn: () => fetchPokemonDetails(prevId),
    enabled: !!prevId,
  });

  const { data: nextPokemon } = useQuery({
    queryKey: [nextId],
    queryFn: () => fetchPokemonDetails(nextId),
    enabled: !!nextId,
  });

  const handlePrev = () => {
    navigate(`/pokemon/${prevId}`);
  };

  const handleNext = () => {
    navigate(`/pokemon/${nextId}`);
  };

  const handleVarietyChange = async (selectedVariety: string) => {
    // console.log("handleVarietyChange called with", selectedVariety);

    if (pokemonVarient) {
      const selectedVarietyData = pokemonVarient?.varieties?.find(
        (pokemon) => pokemon.pokemon.name === selectedVariety
      );
      if (selectedVarietyData) {
        if (!selectedVarietyData?.is_default) {
          const response = await fetch(selectedVarietyData.pokemon.url);
          const varietyDetails: PokemonData = await response.json();
          navigate(`/pokemon/${varietyDetails.id}`);
        } else {
          console.log("selectedVarietyData not found for", selectedVariety);
          navigate(`/pokemon/${pokemonVarient.id}`);
        }
      } else {
        console.log("pokemonVarient is not defined");
      }
    }
  };

  // console.log("pokemonVarient", pokemonVarient);
  // console.log(data);
  useEffect(() => {
    if (data) {
      const fetchData = async () => {
        // console.log("Data available:", data);
        const response = await fetch(data.species.url);
        // console.log("Fetching species data from:", data.species.url);
        const speciesData: PokemonData = await response.json();
        // console.log("Species data fetched:", speciesData);
        setPokemonVarient(speciesData);
      };
      fetchData();
    }
  }, [data]);

  useEffect(() => {
    const fetchGrowthRateData = async () => {
      if (pokemonVarient?.growth_rate) {
        console.log("Fetch growth rate from:", pokemonVarient.growth_rate.name);
        const growthRateData = await fetchGrowthRate(
          pokemonVarient.growth_rate.name
        );
        if (growthRateData) {
          setGrowthRate(growthRateData.name); // or any other relevant data from growthRateData
        }
      }
    };
    fetchGrowthRateData();
  }, [pokemonVarient]);

  useEffect(() => {
    if (data) {
      data.types.map(async (type) => {
        const pokemonTypes = await fetchPokemonType(type.type.name);
        const doubleDamageTypes =
          pokemonTypes.damage_relations.double_damage_from || [];

        setWeakness((prev) => [...prev, ...doubleDamageTypes]);
      });
    }
  }, [data]);

  if (isLoading) return "Loading";
  if (isError)
    return <div>Error fetching Pokémon details: Pokkemon not found</div>;

  // const abilities = data?.abilities.map(
  //   (ability: { ability: { name: string } }) => ability.ability.name
  // );
  return (
    <Layout>
      <div className="h-full w-screen lg:mb-28 xl:mb-0">
        {/* {isLoading ?(
        <div>
          <Skeleton/>
        </div>
        ): data?(  */}
        <div className=" xl:flex xl:flex-col xl:justify-center xl:items-center xl:bg-[url('../src/assets/black-angled-paper-slits-design-free-vector.jpg')]">
          <div className="sm:bg-white   h-32 w-full  xl:flex xl:justify-center xl:flex-col xl:items-center xl:w-7/12 xl: xl:pt-6 ">
            <div className="grid grid-cols-6 w-full mb-2 gap-1 mt-6  xl:mt-20  ">
              <div className="col-span-3 bg-gray-400 py-4 flex  items-center lg:text-2xl ">
                <Button onClick={handlePrev} variant={"ghost"}>
                  <IoIosArrowDropleftCircle className="w-8 h-10 " />
                </Button>
                <span className="ml-10 text-white sm:ml-64 sm:font-bold sm:text-base lg:ml-0 lg:text-2xl xl:text-sm">
                  #{String(prevId).padStart(4, "0")}
                </span>
                {prevPokemon && (
                  <span className="hidden lg:flex lg:pl-2 lg:text-2xl">
                    {/* {capitalize(prevPokemon.name)} */}
                    {prevPokemon.name}
                  </span>
                )}
              </div>
              <div className="col-span-3 flex justify-end items-center bg-gray-400 py-4 ">
                {nextPokemon && (
                  <span className="hidden lg:flex  lg:pr-3 lg:text-2xl">
                    {/* {capitalize(nextPokemon.name)} */}
                    {nextPokemon.name}
                  </span>
                )}
                <span className="mr-10 sm:mr-64 sm:text-base sm:font-bold text-white lg:text-2xl lg:mr-0 xl:text-sm">
                  #{String(nextId).padStart(4, "0")}
                </span>

                <Button onClick={handleNext} variant={"ghost"}>
                  <IoIosArrowDroprightCircle className="w-8 h-10" />
                </Button>
              </div>
            </div>

            <div className="flex justify-center xl:bg-white xl:w-full flex-col items-center">
              {/* {capitalize(data!.name)} */}
              <div className=" flex flex-col items-center text-2xl pb-4 xl:text-3xl justify-center sm:flex-row sm:gap-2 sm:font-semibold xl:w- xl">
                <p className="xl:text-4xl   ">{capitalize(data!.name)}</p>{" "}
                <p className="text-gray-500 ">
                  {" "}
                  #{String(currentId).padStart(4, "0")}
                </p>
              </div>
              <div className="">
                <div className=" mb-14 w-52 ">
                  {pokemonVarient?.varieties &&
                    pokemonVarient.varieties.length > 2 && (
                      <PokemonVariety
                        varieties={pokemonVarient.varieties}
                        onChange={handleVarietyChange}
                        selectedPokemonName={data!.name}
                      />
                    )}
                  {(!pokemonVarient?.varieties ||
                    pokemonVarient.varieties.length === 0) && (
                    <p>No varieties available</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-20 sm:bg-[url('../src/assets/abstract-pattern.avif')] xl:w-7/12 xl:flex xl:justify-center xl:pb-8 xl:items-center">
            <div className="flex justify-center  bg-white flex-col items-center mx-11  sm:w-10/12 sm:mx-14 md:w-9/12 md:mx-28 lg:mx-12 lg:w-11/12 xl:w-10/12  xl:">
              <div className="lg:grid lg:grid-cols-12">
                <div className="lg:col-span-6">
                  <div className="sm:w-full sm:flex sm:flex-col sm:items-center lg: ">
                    <img
                      src={
                        data!.sprites.other?.["official-artwork"].front_default
                      }
                      alt={data!.name}
                      className="bg-gray- h-80 w-full mt-4 sm:w-9/12 md:w-7/12 lg: md:aspect-square sm:h-full rounded-sm"
                    />
                  </div>
                  <div className="w-full sm:w-9/12 sm:text md:w-11/12 md:ml-6  lg:ml-6 lg:col-span-6 xl:">
                    <PokemonChartDT />
                  </div>
                  <div className="mt-6 flex justify-center items-center w-full sm:w-9/12 sm:text md:w-11/12 md:ml-6  lg:ml-6 lg:col-span-6">
                    <PokemonLocation pokemonId={currentId} />
                  </div>
                  <div>
                    {data?.name ? <PokemonGender idOrName={data.name} /> : null}
                  </div>
                </div>
                <div className="lg:col-span-6 ">
                  <div className=" bg-blue-400 my-4 w- py-4 gap-6 xxl:gap-2 sm:ml-16 sm:w-9/12 md:w-11/12 md:ml-6 xl:ml-0 lg:w-11/12 lg:py-8 sm:py-4 sm:rounded-md rounded-sm grid grid-cols-6 lg:mt-4 ">
                    <div className="text-black  col-span-6 lg:col-span-3 xxl:ml-20">
                      <div className="flex flex-col justify-center items-center">
                        <div className=" sm:py-1 text-white text-lg">
                          Ability
                        </div>
                        <div className="text- sm:">
                          {data!.abilities.length > 0 && (
                            <PkmMdAbility
                              abilityName={data!.abilities[0].ability.name}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                    <div className=" col-span-6 lg:col-span-3 xxl:mr-36 xxl:pt-1">
                      {id && (
                        <PkmMdHeight pokeUrl={id}>
                          {(data) => (
                            <div className="flex flex-col justify-center items-center">
                              <div className=" text-white text-lg">Height</div>
                              <div className=" text-xl xxl:pt-1">
                                {convertToFeet(data.height)}
                              </div>
                            </div>
                          )}
                        </PkmMdHeight>
                      )}
                    </div>
                    <div className="col-span-6 lg:col-span-3 xxl:ml-20">
                      <div className="flex flex-col justify-center items-center">
                        <div className="sm:py-1 text-lg text-white">Weight</div>
                        <div className=" text-xl sm:">
                          {coverToLbs(data!.weight)}
                        </div>
                      </div>
                    </div>
                    <div className=" col-span-6 lg:col-span-3 xxl:mr-36">
                      <div className="flex flex-col justify-center items-center">
                        <div className="sm:pt-1 text-lg   text-white ">
                          Gender
                        </div>
                        <div className="text-xl sm:text-2xl">♂︎♀</div>
                        <div>
                          {/* {data?.gender && (
                            <PokemonGender
                              genderRateId={genderRateId.toString()}
                            />
                          )} */}
                        </div>
                      </div>
                    </div>
                    {/* <div>
                      <PokemonShape shapeId="" />
                    </div> */}
                  </div>

                  <div className="w-full grid grid-cols-6 px- sm:px-20 md:px-1 md:basis-1/3 md:ml-6 xl:ml-0 lg:mt-10 ">
                    <div className=" col-span-6 sm:flex sm:justify-center sm:flex-col  ">
                      <div className="pt-1 text-xl pb-4 ">Type</div>
                      <div className="flex flex-row gap-2  ">
                        {data!.types.map((color) => {
                          return (
                            <div key={color.type.name}>
                              <div
                                className={`text-sm  bg-white rounded-sm ${getTypeColors(
                                  data!.types
                                )}`}
                              >
                                <div
                                  className={` px-4 sm:flex sm:justify-center sm:py-1  sm:w-28 rounded-sm ${getTypeColors(
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

                    <div className="col-span-6  lg:mt-">
                      <div className=" text-xl py-4   sm:pb-1  ">
                        Weaknesses
                      </div>
                      <div className="text-xs sm:text-sm   flex flex-col  pt-1  w-full md:w-11/12   sm:py-1 ">
                        <div className="row-span-2">
                          <PokemonTypesWeakness weakness={weakness} />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className=" mt-3  md:ml-6  xl:ml-0 ">
                    {data?.name ? (
                      <div className=" ">
                        <PkmMdSpecies speciesDetails={data.name} />
                      </div>
                    ) : null}
                  </div>
                  <div className=" mt-3  md:ml-6  xl:ml-0 ">
                    {pokemonVarient && <GrowthRates growthRate={growthRate} />}
                  </div>
                  <div className="mt-3 md:ml-6 xl:ml-0 font-semibold">
                    <div className="flex flex-row gap-1 ">
                      {capitalize(data?.name)}
                      <p>sprites</p>
                    </div>
                    <div className="">
                      <PokemonShiny pokemonId={data?.id} />
                    </div>
                  </div>
                </div>

                <div className="sm:w-full lg:col-span-12">
                  {data?.id ? (
                    <PkmEvolution pokemonSpec={data?.id} />
                  ) : (
                    "No evolution data available"
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* )} */}
      </div>
    </Layout>
  );
};

export default PokemonPageID;
