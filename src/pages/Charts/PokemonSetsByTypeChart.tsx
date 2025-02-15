import { EChart } from "@/components/ui/EChart";
import { EChartsOption } from "echarts";

import { Pokemon, pokemonEntries } from "@/lib/parseData";
import { colorMap } from "./constants";

const pokemonsByType = pokemonEntries.reduce<{
  [key: string]: Pokemon[];
}>((acc, entry) => {
  if (!entry.types) {
    return acc;
  }

  return {
    ...acc,
    [entry.types[0]]: [...(acc[entry.types[0]] ?? []), entry],
  };
}, {});

const groupPokemonsByName = (pokemons: Pokemon[]) => {
  return pokemons.reduce<{
    [key: string]: Pokemon[];
  }>((acc, entry) => {
    return {
      ...acc,
      [entry.name]: [...(acc[entry.name] ?? []), entry],
    };
  }, {});
};

const option: EChartsOption = {
  series: {
    type: "sunburst",
    emphasis: {
      focus: "ancestor",
    },
    data: Object.entries(pokemonsByType).map(([pokemonType, entries]) => ({
      name: `${pokemonType} (${entries.length})`,
      itemStyle: {
        color: colorMap[pokemonType],
      },
      children: Object.entries(groupPokemonsByName(entries)).map(
        ([pokemonName, pokemons]) => ({
          name: `${pokemonName} (${pokemons.length})`,
          value: pokemons.length,
          itemStyle: {
            color: colorMap[pokemonType],
          },
        })
      ),
    })),
    radius: [0, "80%"],
    levels: [
      {},
      {
        r0: "20%",
        r: "40%",
        itemStyle: {
          borderWidth: 2,
        },
        label: {
          fontFamily: "Ubuntu",
          fontSize: 14,
          rotate: "radial",
        },
      },
      {
        r0: "40%",
        r: "75%",
        label: {
          fontFamily: "Ubuntu",
          fontSize: 10,
          position: "outside",
          padding: 3,
          silent: false,
        },
      },
    ],
  },
};

export const PokemonSetsByTypeChart = () => {
  return (
    <div className="size-full">
      <EChart option={option} />
    </div>
  );
};
