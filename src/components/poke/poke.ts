// import { PokemonVarietiesSelect } from "./subComp/pokemonVariety";

export interface PokemonList {
  count: number;
  next: string;
  previous: null;
  results: Result[];
}

export interface Result {
  name: string;
  url: string;
  id: string;
}

export interface PokemonData {
  abilities: Ability[];
  base_experience: number;
  cries: Cries;
  forms: Species[];
  game_indices: GameIndex[];
  height: number;
  // held_items: any[];
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: Move[];
  name: string;
  order: number;
  url: string;
  // past_abilities: any[];
  // past_types: any[];
  species: Species;
  sprites: Sprites;
  stats: Stat[];
  types: Type[];
  gender: Gender[];
  weight: number;
  // chain: PokemonEvolution;
  growth_rate: GrowthRate[];
  count: number;
  results: Result[];
  varieties: Varieties[];
}

export interface Varieties {
  pokemon: Species;
  is_default: boolean;
}

export interface Species {
  name: string;
  url: string;
}

export interface Gender {
  id: number;
  name: string;
  pokemon_species_details: Array<{
    pokemon_species: {
      name: string;
    };
  }>;
}
// interface GenderRate {
//   name: string;
//   pokemon_species: { name: string };
// }
export interface Ability {
  ability: AbilityDetails[];
  effect_entries: EffectEntries[];
  is_hidden: boolean;
  slot: number;
  id: number;
  name: string;
}
interface EffectEntries {
  effect: string;
  language: { name: string; url: string };
}
interface AbilityDetails {
  name: string; // Name of the ability
  url: string; // URL to the ability details
}

export interface Cries {
  latest: string;
  legacy: string;
}

export interface GameIndex {
  game_index: number;
  version: Species;
}

export interface Move {
  move: Species;
  version_group_details: VersionGroupDetail[];
}

export interface VersionGroupDetail {
  level_learned_at: number;
  move_learn_method: Species;
  // move_learn_category: Species;
  version_group: Species;
}

export interface GenerationV {
  "black-white": Sprites;
}

export interface GenerationIv {
  "diamond-pearl": Sprites;
  "heartgold-soulsilver": Sprites;
  platinum: Sprites;
}

export interface Versions {
  "generation-i": GenerationI;
  "generation-ii": GenerationIi;
  "generation-iii": GenerationIii;
  "generation-iv": GenerationIv;
  "generation-v": GenerationV;
  "generation-vi": { [key: string]: Home };
  "generation-vii": GenerationVii;
  "generation-viii": GenerationViii;
}

export interface Other {
  dream_world: DreamWorld;
  home: Home;
  "official-artwork": OfficialArtwork;
  showdown: Sprites;
}

export interface Sprites {
  back_default: string;
  back_female: null;
  back_shiny: string;
  back_shiny_female: null;
  front_default: string;
  front_female: null;
  front_shiny: string;
  front_shiny_female: null;
  other?: Other;
  versions?: Versions;
  animated?: Sprites;
}
export interface GenerationI {
  "red-blue": RedBlue;
  yellow: RedBlue;
}

export interface RedBlue {
  back_default: string;
  back_gray: string;
  back_transparent: string;
  front_default: string;
  front_gray: string;
  front_transparent: string;
}

export interface GenerationIi {
  crystal: Crystal;
  gold: Gold;
  silver: Gold;
}

export interface Crystal {
  back_default: string;
  back_shiny: string;
  back_shiny_transparent: string;
  back_transparent: string;
  front_default: string;
  front_shiny: string;
  front_shiny_transparent: string;
  front_transparent: string;
}

export interface Gold {
  back_default: string;
  back_shiny: string;
  front_default: string;
  front_shiny: string;
  front_transparent?: string;
}

export interface GenerationIii {
  emerald: OfficialArtwork;
  "firered-leafgreen": Gold;
  "ruby-sapphire": Gold;
}

export interface OfficialArtwork {
  front_default: string;
  front_shiny: string;
}

export interface Home {
  front_default: string;
  front_female: null;
  front_shiny: string;
  front_shiny_female: null;
}

export interface GenerationVii {
  icons: DreamWorld;
  "ultra-sun-ultra-moon": Home;
}

export interface DreamWorld {
  front_default: string;
  front_female: null;
}

export interface GenerationViii {
  icons: DreamWorld;
}

export interface Stat {
  base_stat: number;
  effort: number;
  stat: Species;
}

export interface Type {
  slot: number;
  type: Species;
}

export interface PokemonShapeData {
  name: string;
  id: number;
  awesome_name?: Array<{
    language: { name: string; url: string };
    awesome_name: string;
  }>;
}
export interface PokemonSpeciesData {
  name: string;
  id: number;
  habitat: { name: string };
  base_happiness: { name: string };
  pokemon_species: { name: string; url: string };
  generation: { name: string };
  egg_groups: { name: string; url: string };
  varieties: Array<{
    name: string;
    url: string;
  }>;
}

export interface PokemonStatSlot {
  stat: {
    name: string;
  };
  base_stat: number;
}

export interface GrowthRate {
  name: string;
  descriptions: Array<{ description: string; language: { name: string } }>;
}
export interface EvolutionDetail {
  trigger: {
    name: string;
  };
  item: {
    name: string;
  };
}

export interface EvolutionChainLink {
  species: {
    name: string;
    url: string;
  };
  evolves_to: EvolutionChainLink[];
  evolution_details: EvolutionDetail[];
}

// export interface PokemonEvolution {
//   id: number;
//   chain: EvolutionChainLink;
// }
export interface EvolutionChain {
  chain: EvolutionChainLink;
}

export interface SpeciesData {
  name: string;
  id: number;
  evolution_chain: {
    url: string;
  };
}
// export interface PokemonAbilitySlot {
//   ability: {
//     name: string;
//     url: string;
//   };
//   is_hidden: boolean;
//   slot: number;
// }
