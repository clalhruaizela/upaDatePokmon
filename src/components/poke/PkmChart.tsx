import { useLocation } from "react-router-dom";
import { PokemonStatSlot } from "./poke";
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

const capitalize = (str: string): string => {
  const [first, ...rest] = str;
  return first.toLocaleUpperCase() + rest.join("");
};

const chartConfig = {
  stats: {
    label: "Pokemon Stats",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

const PokemonChartDT = () => {
  const location = useLocation();
  const pokemon = location.state?.pokemon;

  if (!pokemon) {
    return <div>No data</div>;
  }
  const chartData = pokemon.stats.map((stat: PokemonStatSlot) => ({
    statName: capitalize(stat.stat.name),
    number: stat.base_stat,
  }));
  // console.log("chart", pokemon);
  return (
    <div className="w-full flex justify-center items-center">
      <div className="min-w-full h-full flex flex-col justify-center items-center ">
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
