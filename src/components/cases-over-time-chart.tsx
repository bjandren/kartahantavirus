"use client";

import { useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
} from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group";
import type { CaseTimelinePoint } from "@/lib/tracker-data";

const chartConfig = {
  cumulative_cases: {
    label: "Rapporterade fall",
    color: "var(--destructive)",
  },
  cumulative_deaths: {
    label: "Dödsfall",
    color: "var(--foreground)",
  },
} satisfies ChartConfig;

const chartSeriesOptions = [
  {
    id: "all",
    label: "Alla",
    color: "var(--muted-foreground)",
  },
  {
    id: "cases",
    label: "Rapporterade fall",
    color: "var(--destructive)",
  },
  {
    id: "deaths",
    label: "Dödsfall",
    color: "var(--foreground)",
  },
] as const;

type ChartSeriesFilter = (typeof chartSeriesOptions)[number]["id"];

type CasesOverTimeChartProps = {
  data: CaseTimelinePoint[];
};

export function CasesOverTimeChart({ data }: CasesOverTimeChartProps) {
  const [activeSeries, setActiveSeries] = useState<ChartSeriesFilter>("all");
  const showCases = activeSeries === "all" || activeSeries === "cases";
  const showDeaths = activeSeries === "all" || activeSeries === "deaths";

  return (
    <>
      <ToggleGroup
        aria-label="Filtrera diagramlinjer"
        className="flex w-full flex-wrap justify-start"
        onValueChange={(value) =>
          setActiveSeries((value[0] as ChartSeriesFilter | undefined) ?? "all")
        }
        size="sm"
        spacing={2}
        value={[activeSeries]}
        variant="outline"
      >
        {chartSeriesOptions.map((option) => (
          <ToggleGroupItem
            key={option.id}
            aria-label={`Visa ${option.label.toLowerCase()}`}
            className="gap-2 rounded-lg border-border bg-background px-2.5 text-muted-foreground aria-pressed:border-ring/60 aria-pressed:bg-secondary aria-pressed:text-foreground"
            value={option.id}
          >
            <span
              aria-hidden="true"
              className="size-2 rounded-full"
              style={{ backgroundColor: option.color }}
            />
            {option.label}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>

      <ChartContainer config={chartConfig} className="h-[320px] w-full">
        <LineChart
          accessibilityLayer
          data={data}
          margin={{ left: 6, right: 18, top: 14, bottom: 12 }}
        >
          <CartesianGrid strokeDasharray="4 4" vertical={false} />
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
          <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
          {showCases ? (
            <Line
              dataKey="cumulative_cases"
              type="linear"
              stroke="var(--color-cumulative_cases)"
              strokeWidth={3}
              dot={{ r: 3.5, strokeWidth: 2 }}
              activeDot={{ r: 5 }}
            />
          ) : null}
          {showDeaths ? (
            <Line
              dataKey="cumulative_deaths"
              type="linear"
              stroke="var(--color-cumulative_deaths)"
              strokeWidth={2.25}
              dot={{ r: 3, strokeWidth: 2 }}
              activeDot={{ r: 4.5 }}
            />
          ) : null}
        </LineChart>
      </ChartContainer>
    </>
  );
}
