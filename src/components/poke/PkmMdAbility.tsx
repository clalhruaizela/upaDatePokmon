import { useQuery } from "@tanstack/react-query";
import { PokemonData } from "./poke";
import PokemonAbilityDetail from "./PokemonAbilityEntry";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { FaExclamationCircle } from "react-icons/fa";

const capitalize = (str: string): string => {
  const updatedstr = str.replace(/-/g, " ");
  return updatedstr
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("-");
};

const fetchPokemonAbility = async (id: number | string) => {
  const response = await fetch(`https://pokeapi.co/api/v2/ability/${id}`);
  if (!response.ok) {
    throw new Error(`An error occurred: ${response.statusText}`);
  }
  return (await response.json()) as PokemonData;
};

const PkmMdAbility = ({ abilityName }: { abilityName: string }) => {
  const { isLoading, isError, data } = useQuery({
    queryKey: [abilityName],
    queryFn: async () => fetchPokemonAbility(abilityName),
  });

  if (isLoading) return "Loading ability...";
  if (isError) return "Error loading ability.";

  // const abilities = data?.abilities.map(
  //   (ability: { ability: { name: string } }) => ability.ability.name
  // );
  // console.log("species", data);
  return (
    <div>
      <div className="flex flex-row ">
        {capitalize(data!.name)}{" "}
        <div className="pl-1 pt-1 ">
          <Popover>
            <PopoverTrigger>
              <FaExclamationCircle />
            </PopoverTrigger>
            <PopoverContent className="mx-7 iphoneSe:mr-11 iphone12Pro:mr-12  xs:mr-16 sm:mr-20 lg:ml-24">
              <PokemonAbilityDetail abilitiesPk={data?.name} />
            </PopoverContent>
          </Popover>
        </div>{" "}
      </div>
    </div>
  );
};

export default PkmMdAbility;
