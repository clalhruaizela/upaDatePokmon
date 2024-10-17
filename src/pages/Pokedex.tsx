import { PokemonData, PokemonList } from "@/components/poke/poke";
import PokeCard from "@/components/poke/pokeCard";
import SortPokemon from "@/components/poke/sortPokemon";
import { Button } from "@/components/ui/button";
import Layout from "@/components/ui/Layout/layout";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const fetchPokemon = async (pages: number) => {
  const limit = 21;
  const offset = (pages - 1) * limit;

  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`
  );
  if (!response.ok) {
    throw new Error(`An error occurred: ${response.statusText}`);
  }
  return (await response.json()) as PokemonList;
};

const PokedexHome = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [suggestions, setSuggestion] = useState<string[]>([]);
  const [submit, setSubmit] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [page, setPage] = useState<number>(
    parseInt(searchParams.get("page") || "1")
  );
  const itemsPerPage = 21;

  const { isError, data, error } = useQuery({
    queryKey: ["data", page],
    queryFn: () => fetchPokemon(page),
  });

  // console.log("pokedex data", data);
  const totalPages = Math.ceil((data?.count || 0) / itemsPerPage);

  const handlePageChange = (page: number) => {
    setPage(page);
    setSearchParams(
      (param) => {
        param.set("page", page.toString());
        return param;
      },
      {
        preventScrollReset: true,
      }
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prevIndex) =>
        prevIndex < suggestions.length - 1 ? prevIndex + 1 : 0
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : suggestions.length - 1
      );
    } else if (e.key === "Enter" && selectedIndex >= 0) {
      e.preventDefault();
      setSearchTerm(suggestions[selectedIndex]);
      setSuggestion([]);
    }
  };

  useEffect(() => {
    if (!page) {
      setSearchParams(
        (param) => {
          param.set("page", "1");
          return param;
        },
        {
          preventScrollReset: true,
        }
      );
    }
  }, [page, setSearchParams]);

  // Debounce the search term to avoid multiple re-renders while typing
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm.length > 0) {
        const filteredSuggestions =
          data?.results
            .map((pokemon) => pokemon.name)
            .filter(
              (name) =>
                name.toLowerCase().startsWith(searchTerm.toLowerCase()) ||
                name.toLowerCase().includes(searchTerm.toLowerCase())
            ) || [];
        setSuggestion(filteredSuggestions);
      } else {
        setSuggestion([]);
      }
    }, 300); //300ms debounce
    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, data]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSubmit(searchTerm);
    setSuggestion([]);
    e.currentTarget.reset();
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchTerm(suggestion);
    setSuggestion([]);
  };

  let filteredPokemon = [...(data?.results || [])];

  useEffect(() => {
    if (submit && filteredPokemon.length === 0) {
      setErrorMessage(`No Pokémon found with the name "${submit}".`);
    } else {
      setErrorMessage("");
    }
  }, [submit, filteredPokemon.length]);

  // if (isLoading) return "Loading";
  if (isError) return `Error: ${error.message}`;

  if (submit) {
    filteredPokemon = filteredPokemon.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(submit.toLowerCase())
    );
  }

  const startIndex = (page - 1) * itemsPerPage;

  return (
    <Layout>
      <div className="xl:bg-[url('../src/assets/black-angled-paper-slits-design-free-vector.jpg')] xl:min-h-screen xl:w-full lg:justify-center">
        <div className="  h-full  w-full  lg:w-8/12 xl:w-full xl:flex xl:justify-center  font-semibold text-white ">
          <div className="flex-col lg:w-screen xl:w-8/12 xl:left-9 bg-whitePattern  flex justify-center items-center">
            <div className="h-48 flex flex-col items-center lg:h-80 xl:h-56 w-full xl:w-12/12  text-black bg-[#313131] ">
              <div className="relative md:flex md:flex-row md:justify-center md:items-center md:py-2 px-16 lg:pt-16 lg:px-0  ">
                <p className="sm:text-xl text-white md:pr-2 pt-4 pb-1 lg:absolute lg:top-6 lg:left-1 lg:text-2xl">
                  Name
                </p>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="border mb-2 px-2 rounded-sm h-6 w-36 md:mt-4  lg:h-10 lg:w-80"
                />
                <Button
                  className="h-6 w-14 lg:h-10 md:mb-2 md:mt-4"
                  variant={"destructive"}
                  onClick={handleSearchSubmit}
                >
                  search
                </Button>
                <div className="">
                  {suggestions.length > 0 && (
                    <ul className="bg-white absolute text-black border h-28 w-36 lg:w-80 lg:left-0 lg:top-32  rounded-md sm:mt-1  overflow-auto">
                      {suggestions.map((suggestion, index) => (
                        <li
                          key={suggestion}
                          onClick={() => handleSuggestionClick(suggestion)}
                          className={`cursor-pointer hover:bg-gray-400 px-4 py-1 ${
                            index === selectedIndex ? "bg-gray-400" : ""
                          }`}
                        >
                          {suggestion}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
            <div>{/* <SortPokemon pokemonData={pokemonData} /> */}</div>
            <div
              className="flex flex-col md:grid md:grid-cols-3  min-h-screen md:gap-4  md:w-9/12  xl:w-8/12   bg-white md:py-6 "
              start={startIndex + 1}
            >
              {errorMessage ? (
                <div className="min-h-screen md:col-span-3 ">
                  <div className=" w-full  md:mt-16 mt-5 flex justify-center items-center flex-col md:justify-center  ">
                    <div className="border-red-600 border-4 w-60 md:w-80 py-10 mb-10 px-10 text-center text-red-500">
                      {errorMessage}
                    </div>
                    <div>
                      <img src="src/assets/Pikachu.png" />
                    </div>
                  </div>
                </div>
              ) : (
                filteredPokemon
                  .filter((pokemon) =>
                    pokemon.name
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase())
                  )
                  .map((pokemon) => (
                    <div
                      className="w-full md:w-auto "
                      data-aos="fade-up"
                      data-aos-offset="200"
                      data-aos-delay="50"
                      data-aos-duration="1000"
                      data-aos-easing="ease-in-out"
                      data-aos-mirror="true"
                      data-aos-once="false"
                      data-aos-anchor-placement="top-center"
                      key={pokemon.name}
                    >
                      <div className="text-black  p-4 flex justify-center transition duration-150 ease-in-out hover:ease-in-out hover:-translate-y-1">
                        <PokeCard pokemonUrl={pokemon.url} />
                      </div>
                    </div>
                  ))
              )}
            </div>
            <div className="flex w-full  md:w-9/12 xxl:w-8/12 bg-white  md:pb-4">
              {!submit && (
                <Pagination className="py-5 w-24 border-t-2 md:py-10 ">
                  <PaginationContent>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (item) => {
                        if (
                          Math.abs(item - page) <= 1 ||
                          item === 1 ||
                          item === totalPages
                          // ||
                          // (item % 3 === 0 && Math.abs(item - page) <= 2)
                        ) {
                          return (
                            <PaginationItem key={item}>
                              <Button
                                variant={"secondary"}
                                onClick={() => {
                                  window.scrollTo(0, 0);
                                  handlePageChange(item);
                                }}
                              >
                                {item}
                              </Button>
                            </PaginationItem>
                          );
                        } else if (
                          (item === 2 && page > 3) ||
                          (item === totalPages - 1 && page < totalPages - 2)
                          // (item % 3 === 0 && Math.abs(item - page) <= 2)
                        ) {
                          return <PaginationEllipsis key={item} />;
                          // return <span key={item}></span>;
                        }
                        return null;
                      }
                    )}
                  </PaginationContent>
                </Pagination>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PokedexHome;
