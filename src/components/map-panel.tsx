"use client";

import dynamic from "next/dynamic";
import { useMemo, useState } from "react";

import type { HantaMapProps } from "@/components/hanta-map";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group";
import {
  mapFilterOptions,
  type MapFilterId,
} from "@/lib/map-categories";
import type { MapLocation } from "@/lib/tracker-data";

const HantaMap = dynamic<HantaMapProps>(() => import("@/components/hanta-map"), {
  loading: () => (
    <div className="flex h-[420px] items-center justify-center rounded-lg border bg-muted text-sm text-muted-foreground md:h-[540px]">
      Laddar karta
    </div>
  ),
  ssr: false,
});

export type MapPanelProps = {
  locations: MapLocation[];
};

export function MapPanel({ locations }: MapPanelProps) {
  const [activeFilter, setActiveFilter] = useState<MapFilterId>("all");
  const activeOption =
    mapFilterOptions.find((option) => option.id === activeFilter) ??
    mapFilterOptions[0];
  const activeCategories = activeOption.categories;

  const filteredLocations = useMemo(() => {
    if (!activeCategories) {
      return locations;
    }

    return locations.filter((location) =>
      activeCategories.includes(location.category)
    );
  }, [activeCategories, locations]);

  return (
    <>
      <HantaMap locations={filteredLocations} />
      <ToggleGroup
        aria-label="Filtrera kartpunkter"
        className="flex w-full flex-wrap justify-start"
        onValueChange={(value) =>
          setActiveFilter((value[0] as MapFilterId | undefined) ?? "all")
        }
        size="sm"
        spacing={2}
        value={[activeFilter]}
        variant="outline"
      >
        {mapFilterOptions.map((option) => (
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
      <p className="text-sm leading-6 text-muted-foreground">
        Kartan visar bara det aktuella klustret: ungefärlig rutt, klusterplats
        och kopplade vård- och bevakningspunkter.
      </p>
    </>
  );
}
