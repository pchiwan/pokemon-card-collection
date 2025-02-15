import { EChart } from "@/components/ui/EChart";
import type { EChartsOption } from "echarts";

import { categorisedEntries } from "@/lib/parseData";

const option: EChartsOption = {
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "shadow",
    },
    textStyle: {
      fontFamily: "Ubuntu",
      fontSize: 14,
    },
  },
  grid: {
    left: "3%",
    right: "4%",
    bottom: "3%",
    containLabel: true,
  },
  xAxis: [
    {
      type: "category",
      data: Object.keys(categorisedEntries),
      axisTick: {
        alignWithLabel: true,
      },
      axisLabel: {
        fontFamily: "Ubuntu",
        fontSize: 14,
      },
    },
  ],
  yAxis: [
    {
      type: "value",
      axisLabel: {
        fontFamily: "Ubuntu",
        fontSize: 14,
      },
    },
  ],
  series: [
    {
      name: "Count",
      type: "bar",
      barWidth: "50%",
      data: Object.values(categorisedEntries).map((entries) => entries.length),
    },
  ],
};

export const CardTypeDistributionChart = () => {
  return (
    <div className="size-full">
      <EChart option={option} />
    </div>
  );
};
