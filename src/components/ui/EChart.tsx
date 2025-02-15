import { cn } from "@/lib/utils";
import type { ECharts, EChartsOption, SetOptionOpts } from "echarts";
import { getInstanceByDom, init } from "echarts";
import { useEffect, useRef } from "react";

export interface EChartProps {
  className?: string;
  isLoading?: boolean;
  option: EChartsOption;
  settings?: SetOptionOpts;
  theme?: "light" | "dark";
}

export function EChart({
  className,
  isLoading,
  option,
  settings,
  theme,
}: EChartProps) {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let chart: ECharts | undefined;
    if (chartRef.current !== null) {
      chart = init(chartRef.current, theme);
    }

    // Add chart resize listener
    const resizeChart = () => {
      chart?.resize();
    };
    window.addEventListener("resize", resizeChart);

    // Return cleanup function
    return () => {
      chart?.dispose();
      window.removeEventListener("resize", resizeChart);
    };
  }, [theme]);

  useEffect(() => {
    // Update chart
    if (chartRef.current !== null) {
      const chart = getInstanceByDom(chartRef.current);
      chart?.setOption(option, settings);
    }
    // Whenever theme changes we need to add option and settings due to it being deleted in cleanup function
  }, [option, settings, theme]);

  useEffect(() => {
    // Update chart
    if (chartRef.current !== null) {
      const chart = getInstanceByDom(chartRef.current);
      if (isLoading) {
        chart?.showLoading();
      } else {
        chart?.hideLoading();
      }
    }
  }, [isLoading, theme]);

  return (
    <div
      className={className}
      ref={chartRef}
      style={{ width: "100%", height: "100%" }}
    />
  );
}
