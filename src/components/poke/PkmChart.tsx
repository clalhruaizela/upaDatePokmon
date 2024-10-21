import { useParams } from "react-router-dom";
import { PokemonData, PokemonStatSlot } from "./poke";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../ui/chart";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";
import { useEffect, useState } from "react";

const capitalize = (str: string): string => {
  const [first, ...rest] = str;
  return first.toLocaleUpperCase() + rest.join("");
};

const fetchPokemonState = async (id: number | string) => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  if (!response.ok) {
    throw new Error(`An error occurred: ${response.statusText}`);
  }
  return (await response.json()) as PokemonData;
};

const chartConfig = {
  stats: {
    label: "Pokemon Stats",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

const PokemonChartDT = () => {
  const [pokemon, setPokemon] = useState<PokemonData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const loadPokemon = async () => {
      try {
        const data = await fetchPokemonState(id);
        setPokemon(data);
      } catch (err) {
        setError((err as Error).message);
      }
    };
    loadPokemon();
  }, [id]);

  if (error) {
    return <div>Error:{error} </div>;
  }
  if (!pokemon) {
    return <div>Loading ...</div>;
  }
  const chartData = pokemon.stats.map((stat: PokemonStatSlot) => ({
    statName: capitalize(stat.stat.name),
    number: stat.base_stat,
  }));
  // console.log("chart", pokemon);
  return (
    <div className="w-full flex justify-center items-center">
      <div className=" h-full flex flex-col justify-center items-center  ">
        <h1 className="font-bold pt-4 text-xl sm:text-2xl">Stats</h1>
        <ChartContainer
          config={chartConfig}
          className=" aspect-square min-h-[250px] w-full h-full"
        >
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{
              right: 16,
            }}
          >
            <CartesianGrid vertical={false} />

            <YAxis
              dataKey="statName"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(statName) => statName.slice(0, 3)}
              hide
            />
            <XAxis dataKey="number" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Bar
              dataKey="number"
              fill="hsl(var(--custom-red))"
              layout="vertical"
              radius={4}
            >
              <LabelList
                dataKey="statName"
                position="insideLeft"
                offset={8}
                className="fill-[white]"
                fontSize={12}
              />
              <LabelList
                dataKey="number"
                position="right"
                offset={8}
                className="fill-[--color-label]"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </div>
    </div>
  );
};
export default PokemonChartDT;
