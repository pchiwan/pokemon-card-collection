import { EChart } from "@/components/ui/EChart";
import type { EChartsOption } from "echarts";

import { uniqueEntries, type CollectionEntry } from "@/lib/parseData";

const entriesGroupedByRarity = uniqueEntries.reduce<{
  [key: string]: CollectionEntry[];
}>((acc, entry) => {
  if (entry.rarity === undefined) {
    return acc;
  }

  const key = entry.rarity.startsWith("Rare") ? "Rare" : entry.rarity;

  return {
    ...acc,
    [key]: [...(acc[key] ?? []), entry],
  };
}, {});

const option1: EChartsOption = {
  tooltip: {
    trigger: "item",
  },
  legend: {
    orient: "vertical",
    left: "left",
    textStyle: {
      fontFamily: "Ubuntu",
      fontSize: 14,
    },
  },
  series: [
    {
      name: "Card rarity",
      type: "pie",
      radius: "50%",
      itemStyle: {
        borderRadius: 5,
      },
      label: {
        fontFamily: "Ubuntu",
        fontSize: 14,
      },
      data: Object.keys(entriesGroupedByRarity).map((key) => ({
        value: entriesGroupedByRarity[key].length,
        name: key,
      })),
    },
  ],
};

const categorisedRareCards = entriesGroupedByRarity["Rare"].reduce<{
  [key: string]: CollectionEntry[];
}>((acc, entry) => {
  if (entry.rarity === undefined) {
    return acc;
  }

  return {
    ...acc,
    [entry.rarity]: [...(acc[entry.rarity] ?? []), entry],
  };
}, {});

const option2: EChartsOption = {
  tooltip: {
    trigger: "item",
  },
  legend: {
    orient: "vertical",
    left: "left",
    textStyle: {
      fontFamily: "Ubuntu",
      fontSize: 14,
    },
  },
  series: [
    {
      name: "Card rarity: Rare",
      type: "pie",
      radius: "50%",
      itemStyle: {
        borderRadius: 5,
      },
      label: {
        fontFamily: "Ubuntu",
        fontSize: 14,
      },
      data: Object.keys(categorisedRareCards).map((key) => ({
        value: categorisedRareCards[key].length,
        name: key,
      })),
    },
  ],
};

export const CardRarityChart = () => {
  return (
    <div className="grid grid-cols-2 gap-6 size-full">
      <div className="flex flex-col gap-3 h-full">
        <h2 className="text-xl text-zinc-600 font-bold text-center border-b border-b-zinc-300">
          All cards
        </h2>
        <EChart option={option1} />
      </div>
      <div className="flex flex-col gap-3 h-full">
        <h2 className="text-xl text-zinc-600 font-bold text-center border-b border-b-zinc-300">
          Rare cards
        </h2>
        <EChart option={option2} />
      </div>
    </div>
  );
};
