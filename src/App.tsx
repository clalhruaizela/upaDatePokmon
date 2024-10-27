import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route, Routes } from "react-router-dom";
import PokemonPageID from "./components/poke/pages/pkmPageID";
import PokedexHome from "./pages/Pokedex";
import GenerationTwo from "./components/poke/moveDetailSubComp/subPaginationPages/GenerationTwo";
import GenerationThree from "./components/poke/moveDetailSubComp/subPaginationPages/GenerationThree";
import GenerationOne from "./components/poke/moveDetailSubComp/subPaginationPages/GenerationOne";

const queryClient = new QueryClient();
function App() {
  return (
    <div className="bg-[url('src/assets/abstract-blue.jpg')] w-full min-h-full">
      <div className="flex pb-1 justify-center bg-slate-300 font-bold sm:py-5 border-gray-400 border-b-2">
        <img src="../src/assets/pokedex-logo.png" className="h-20 w-48" />
      </div>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/pokemon" element={<PokedexHome />} />
          <Route path="/pokemon/:id" element={<PokemonPageID />} />
          <Route
            path="/pokemon/:id/move/:page/:name"
            element={<GenerationOne />}
          />
          <Route
            path="/pokemon/:id/move/:page/:name"
            element={<GenerationTwo />}
          />
          <Route
            path="/pokemon/:id/move/:page/:name"
            element={<GenerationThree />}
          />
        </Routes>
      </QueryClientProvider>
    </div>
  );
}

export default App;
