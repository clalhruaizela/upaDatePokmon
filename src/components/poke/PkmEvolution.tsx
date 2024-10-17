import { EvolutionChainLink } from "./poke";
import EvoImageCard from "./subComp/evoImage";
import usePokemonEvolution from "./subComp/usePokemonEvolution";

// Error display component
const ErrorState = ({
  message,
  pokemonId,
}: {
  message: string;
  pokemonId: number;
}) => (
  <div className=" text-white p-4 text-center ">
    <img
      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`}
      alt="Current Pokémon"
      className="mx-auto mb-2 border-white rounded-2xl  border-4"
    />
    {message}
  </div>
);

// Loading state component
const LoadingState = () => <div>Loading evolution...</div>;

// Recursive component to render the evolution chain
const EvolutionStage = ({ chain }: { chain: EvolutionChainLink }) => {
  const { species, evolves_to } = chain;
  const pokemonId = species.url.split("/").slice(-2, -1)[0];

  return (
    <div className="sm:flex sm:items-center sm:justify-center sm:w-full lg:flex lg:justify-center lg:items-center lg:mb-2 lg:basis-1/3 lg:pl-4 xl:pl-0">
      <div className="items-center flex-col lg:flex-row flex lg:basis-1/3 mb-5 lg:justify-evenly lg:w-full gap-3 text-white sm:ml sm:w-9/12 xxl:gap-10">
        <EvoImageCard pokemonId={pokemonId} speciesName={species.name} />
        {evolves_to.length > 0 && (
          <div className="lg:flex lg:justify-center lg:items-center lg:mt-8 lg:basis-1/3 lg:h-36 ">
            {evolves_to.map((evolution) => (
              <EvolutionStage key={evolution.species.name} chain={evolution} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Main component to render the full evolution chain
const PkmEvolution = ({ pokemonSpec }: { pokemonSpec: number }) => {
  const {
    speciesLoading,
    speciesError,
    evolutionLoading,
    evolutionError,
    evolutionData,
  } = usePokemonEvolution(pokemonSpec);

  const pokemonId = pokemonSpec;

  if (speciesLoading || evolutionLoading) return <LoadingState />;
  if (speciesError || evolutionError) {
    return (
      <div className="flex justify-center items-center lg:justify-center mb-5  rounded-br-sm rounded-bl-3xl bg-red-400 text-white ml-8 sm:w-9/12 md:w-11/12 ">
        <ErrorState
          message="This Pokémon does not evolve."
          pokemonId={pokemonId}
        />
      </div>
    );
  }

  return (
    <div className="sm:w-full sm:ml-20 md:ml-6">
      <div className="rounded-t-sm mt-5 pt-3 pl-2 bg-red-400 text-white text-2xl sm:w-9/12 md:w-11/12 sm:flex sm:pl-4 sm:items-center ">
        <p>Evolutions</p>
      </div>
      <div className="flex justify-center items-center lg:justify-center mb-5 rounded-br-sm rounded-bl-3xl bg-red-400 gap-3 text-white sm:ml sm:w-9/12 md:w-11/12 ">
        {evolutionData && <EvolutionStage chain={evolutionData.chain} />}
      </div>
    </div>
  );
};

export default PkmEvolution;

//1025 pokemon
// const fetchPokemonSpecies = async (pokemonId: number) => {
//   // console.log("Fetching species for Pokémon ID:", pokemonId);
//   const response = await fetch(
//     `https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`
//   );
//   if (!response.ok) {
//     throw new Error(`An error occurred: ${response.statusText}`);
//   }
//   return await response.json(); // This returns the National Dex number
// };

// const fetchEvolutionChain = async (url: string) => {
//   const response = await fetch(url);
//   if (!response.ok) {
//     throw new Error(`An error occurred: ${response.statusText}`);
//   }
//   return await response.json();
// };

// // const capitalize = (str: string): string => {
// //   return str.charAt(0).toUpperCase() + str.slice(1);
// // };

// const PkmEvolution = ({ pokemonSpec }: { pokemonSpec: number }) => {
//   const {
//     isLoading: speciesLoading,
//     isError: speciesError,
//     data: speciesData,
//   } = useQuery<SpeciesData>({
//     queryKey: ["pokemon-species", pokemonSpec],
//     queryFn: async () => fetchPokemonSpecies(pokemonSpec),
//     retry: 1,
//   });
//   // const navigator = useNavigate();
//   const {
//     data: evolutionData,
//     isLoading: evolutionLoading,
//     isError: evolutionError,
//   } = useQuery<EvolutionChain>({
//     queryKey: ["evolution-chain", speciesData?.evolution_chain?.url],
//     queryFn: () => fetchEvolutionChain(speciesData!.evolution_chain?.url),
//     enabled: !!speciesData, // Only run this query if speciesData is available
//   });
//   // console.log("speciesData", speciesData);
//   if (speciesLoading || evolutionLoading) return "Loading evolution...";
//   if (speciesError || evolutionError) {
//     // const pokemonName = speciesData
//     //   ? capitalize(speciesData.name)
//     //   : "unknown Pokemon";
//     return (
//       <div className="">
//         <div className="sm:w-full  sm:ml-20 md:ml-6 flex flex-col   ">
//           <div className=" rounded-t-sm mt-5 pt-3 pl-2 bg-red-400 text-white text-sm sm:w-9/12 md:w-11/12   sm:pl-4 sm:items-center">
//             <p className="text-base">Evolutions</p>
//             <p>This Pokémon does not evolve.</p>
//           </div>
//         </div>
//         <div className="flex  justify-center items-center lg:justify-center  py-10 mb-4 rounded-br-sm rounded-bl-3xl bg-red-400  gap-3 text-white sm:ml md:ml-6 sm:w-9/12 md:w-11/12 lg:   lg:basis-1/2">
//           <div className="border-4 md:border-8 border-white flex justify-center items-center rounded-full w-28  h-28 md:w-36 md:h-36 lg:h-40 lg:w-40 lg:my-10 ">
//             <img
//               src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonSpec}.png`}
//               alt={`Pokemon ID ${pokemonSpec}`}
//               className="w-20 sm:w-28 md:w-64 md:h-40 lg:w-36"
//             />
//           </div>
//           {/* <div>{pokemonName}</div> */}
//         </div>
//       </div>
//     );
//   }
//   const renderEvolutionChain = (chain: EvolutionChainLink) => {
//     const { species, evolves_to } = chain;
//     const pokemonId = species.url.split("/").slice(-2, -1)[0];
//     // console.log("speciesData", pokemonId);
//     // const hasEvolution = evolves_to.length > 0;
//     return (
//       <div
//         key={species.name}
//         className="sm:flex sm:items-center sm:justify-center sm:w-full lg:flex lg:justify-center lg:items-center lg:mb-2 lg:basis-1/3 lg:pl-4"
//       >
//         <div className="items-center flex-col lg:flex-row flex lg:basis-1/3 mb-5  lg:justify-evenly  lg:w-full gap-3 text-white sm:ml sm:w-9/12">
//           <EvoImageCard pokemonId={pokemonId} speciesName={species.name} />
//           {evolves_to.length > 0 && (
//             <div className="lg:flex lg:justify-center lg:items-center lg:mt-8 lg:basis-1/3 lg:h-36">
//               {evolves_to.map((evolution) => renderEvolutionChain(evolution))}
//             </div>
//           )}
//         </div>
//       </div>
//     );
//   };
