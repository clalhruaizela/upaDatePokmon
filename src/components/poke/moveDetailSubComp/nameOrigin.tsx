import React, { useEffect, useState } from "react";


interface PokemonSpecies {
  id: number;
  name: string;
  flavor_text_entries: Array<{
    flavor_text: string;
    language: { name: string };
  }>;
}

const fetchPokemonSpecies = async (pokemonName:string)=>{
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonName}`)
  if(!response.ok){
    throw new Error(`An error occurred: ${response.statusText}`);
  }
  return await response.json()
}


const NameOrigin: React.FC<{ pokemonName: string }> = ({ pokemonName }) => {
  const [nameOrigin, setNameOrigin] = useState<string | null>(null);

  useEffect(() => {
    
      .get<PokemonSpecies>(
        `https://pokeapi.co/api/v2/pokemon-species/${pokemonName}`
      )
      .then((response) => {
        const englishEntry = response.data.flavor_text_entries.find(
          (entry) => entry.language.name === "en"
        );
        if (englishEntry) {
          setNameOrigin(englishEntry.flavor_text);
        } else {
          setNameOrigin("No English origin available.");
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setNameOrigin("Error fetching name origin.");
      });
  }, [pokemonName]);

  if (!nameOrigin) return <div>Loading...</div>;

  return (
    <div>
      <h2>{pokemonName} Name Origin</h2>
      <p>{nameOrigin}</p>
    </div>
  );
};

export default NameOrigin;
