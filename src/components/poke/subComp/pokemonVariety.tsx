import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface Variety {
  pokemon: {
    name: string;
    url: string;
  };
}

const capitalize = (str: string): string => {
  const updatedstr = str.replace(/-/g, " ");
  return updatedstr
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};
export interface PokemonVarietiesSelect {
  varieties: Variety[];
  selectedPokemonName: string;
  onChange: (selectedVariety: string) => void;
}

const PokemonVariety: React.FC<PokemonVarietiesSelect> = ({
  varieties,
  onChange,
  selectedPokemonName,
}) => {
  // console.log("DropD-variesties", varieties);
  const [selectedVariety, setSelectedVariety] = useState<string | null>(null);
  const hasVarieties = varieties && varieties.length > 0;

  const handleSelectChange = (value: string) => {
    setSelectedVariety(value);
    onChange(value);
  };

  console.log("selectedPokemonName", selectedPokemonName);
  useEffect(() => {
    if (hasVarieties) {
      // console.log("at 0", varieties[0]);
      const defaultVariety = varieties.find(
        (pokemon) => pokemon.pokemon.name === selectedPokemonName
      );
      console.log("defaultVariety", defaultVariety);
      setSelectedVariety(defaultVariety?.pokemon?.name || null);
    }
  }, [varieties]);

  return (
    <div>
      {hasVarieties && (
        <Select
          value={selectedVariety || ""}
          onValueChange={handleSelectChange}
        >
          <SelectTrigger className="my-2 w-full rounded-md  bg-black text-white hover:bg-gray-300">
            <SelectValue
              placeholder={capitalize(selectedVariety || "Select a variety")}
            />
          </SelectTrigger>
          <SelectContent className="bg-gray-600 text-white">
            {varieties.map((variety) => (
              <SelectItem
                key={variety.pokemon.name}
                value={variety.pokemon.name}
                onClick={() => onChange(variety.pokemon.name)}
              >
                {capitalize(variety.pokemon.name)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    </div>
  );
};

export default PokemonVariety;
