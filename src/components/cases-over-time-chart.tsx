"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceLine,
  XAxis,
  YAxis,
} from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import type { CaseTimelinePoint } from "@/lib/tracker-data";

const chartConfig = {
  cumulative_cases: {
    label: "Fall",
    color: "var(--destructive)",
  },
  cumulative_deaths: {
    label: "Dödsfall",
    color: "var(--foreground)",
  },
} satisfies ChartConfig;

type CasesOverTimeChartProps = {
  data: CaseTimelinePoint[];
};

export function CasesOverTimeChart({ data }: CasesOverTimeChartProps) {
  return (
    <ChartContainer config={chartConfig} className="h-[320px] w-full">
      <LineChart
        accessibilityLayer
        data={data}
        margin={{ left: 6, right: 18, top: 14, bottom: 12 }}
      >
        <CartesianGrid
          strokeDasharray="4 4"
          vertical={false}
        />
        <XAxis
          dataKey="label"
          tickLine
          tickMargin={10}
          axisLine
          minTickGap={16}
        />
        <YAxis
          allowDecimals={false}
          domain={[0, 15]}
          ticks={[0, 3, 6, 9, 12, 15]}
          tickLine
          axisLine
          tickMargin={10}
          width={34}
          label={{
            value: "Antal",
            angle: -90,
            position: "insideLeft",
            offset: 0,
          }}
        />
        <ReferenceLine
          y={8}
          stroke="var(--border)"
          strokeDasharray="4 4"
          label={{
            value: "Officiell total: 8",
            position: "insideTopRight",
            fill: "var(--muted-foreground)",
            fontSize: 12,
          }}
        />
        <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
        <Line
          dataKey="cumulative_cases"
          type="linear"
          stroke="var(--color-cumulative_cases)"
          strokeWidth={3}
          dot={{ r: 3.5, strokeWidth: 2 }}
          activeDot={{ r: 5 }}
        />
        <Line
          dataKey="cumulative_deaths"
          type="linear"
          stroke="var(--color-cumulative_deaths)"
          strokeWidth={2.25}
          dot={{ r: 3, strokeWidth: 2 }}
          activeDot={{ r: 4.5 }}
        />
      </LineChart>
    </ChartContainer>
  );
}
