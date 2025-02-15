import { EChart } from "@/components/ui/EChart";
import type { EChartsOption } from "echarts";

import { pokemonEntries } from "@/lib/parseData";
import { colorMap } from "./constants";

const getAverage = (values: number[]) => {
  return (
    values.reduce((acc, value) => acc + value, 0) / values.length
  ).toFixed(2);
};

const totalHPByPokemonType = pokemonEntries.reduce<{
  [key: string]: number[];
}>((acc, entry) => {
  if (!entry.types) {
    return acc;
  }

  return {
    ...acc,
    ...entry.types.reduce(
      (subacc, type) => ({
        ...subacc,
        [type]: [...(acc[type] ?? []), Number(entry.hp)],
      }),
      {}
    ),
  };
}, {});

const option: EChartsOption = {
  tooltip: {
    trigger: "item",
    // TODO: Fix any type
    textStyle: {
      fontFamily: "Ubuntu",
      fontSize: 14,
    },
    formatter: function (params: any) {
      const data = params.data as [string, number, number];
      return [
        `<strong>Pokémon Type</strong>:${data[0]}`,
        `<strong>Avg HP</strong>: ${data[1]}`,
        `<strong>Total</strong>: ${data[2]}`,
      ].join("<br />");
    },
  },
  xAxis: {
    axisLabel: {
      fontFamily: "Ubuntu",
      fontSize: 14,
    },
    nameTextStyle: {
      fontFamily: "Ubuntu",
      fontSize: 12,
    },
    data: Object.keys(totalHPByPokemonType),
    name: "Pokémon Type",
    type: "category",
  },
  yAxis: {
    axisLabel: {
      fontFamily: "Ubuntu",
      fontSize: 14,
    },
    nameTextStyle: {
      fontFamily: "Ubuntu",
      fontSize: 12,
    },
    min: 55,
    name: "Average HP",
    type: "value",
  },
  series: [
    {
      symbolSize: (data: [string, number, number]) => Math.sqrt(data[2]) * 5,
      data: Object.entries(totalHPByPokemonType).map(([key, value]) => [
        key,
        getAverage(value),
        value.length,
      ]),
      type: "scatter",
      itemStyle: {
        color: (params): string => {
          const data = params.data as [string, number, number];
          return colorMap[data[0]];
        },
      },
    },
  ],
};

export const PokemonTypeVsHPChart = () => {
  return (
    <div className="size-full">
      <EChart option={option} />
    </div>
  );
};
