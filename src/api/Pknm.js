export function fetchPokemon() {
  return fetch("https://pokeapi.co/api/v2/pokemon?offset=10").then((response) =>
    response.json()
  );
}
export const fetchPokemonAbilities = async () => {
  const abilityName = "static";
  await fetch(`https://pokeapi.co/api/v2/ability/${abilityName}`);
  const data = response.json();
  return data;
};
