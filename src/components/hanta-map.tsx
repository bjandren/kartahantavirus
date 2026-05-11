"use client";

import type { LatLngExpression } from "leaflet";
import {
  CircleMarker,
  MapContainer,
  Polyline,
  Popup,
  TileLayer,
} from "react-leaflet";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  fallbackMapCategoryStyle,
  mapCategoryStyles,
} from "@/lib/map-categories";
import type { MapLocation } from "@/lib/tracker-data";

export type HantaMapProps = {
  locations: MapLocation[];
};

export default function HantaMap({ locations }: HantaMapProps) {
  const routePositions = [...locations]
    .filter((location) => typeof location.route_order === "number")
    .sort((a, b) => (a.route_order ?? 0) - (b.route_order ?? 0))
    .map((location) => [location.lat, location.lng] as LatLngExpression);

  return (
    <div className="h-[420px] overflow-hidden rounded-lg border bg-muted md:h-[540px]">
      <MapContainer
        center={[12, -22]}
        zoom={2}
        minZoom={2}
        maxZoom={8}
        scrollWheelZoom={false}
        className="h-full w-full"
        worldCopyJump
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {routePositions.length > 1 ? (
          <Polyline
            positions={routePositions}
            pathOptions={{
              color: "#334155",
              dashArray: "6 8",
              opacity: 0.72,
              weight: 2,
            }}
          />
        ) : null}
        {locations.map((point) => {
          const style =
            mapCategoryStyles[point.category] ?? fallbackMapCategoryStyle;

          return (
            <CircleMarker
              key={`${point.category}-${point.id}`}
              center={[point.lat, point.lng]}
              pathOptions={{
                color: style.color,
                fillColor: style.fillColor,
                fillOpacity: 0.78,
                opacity: 0.95,
                weight: 2,
              }}
              radius={style.radius}
            >
              <Popup className="hanta-popup" maxWidth={280} minWidth={248}>
                <div className="flex w-64 flex-col gap-3 p-3">
                  <div className="flex flex-col gap-1.5 pr-5">
                    <p className="text-sm font-semibold leading-5 text-foreground">
                      {point.name}
                    </p>
                    <Badge className="gap-1.5" variant="secondary">
                      <span
                        aria-hidden="true"
                        className="size-1.5 rounded-full"
                        style={{ backgroundColor: style.fillColor }}
                      />
                      {style.label}
                    </Badge>
                  </div>
                  {"metric" in point && point.metric ? (
                    <p className="text-[13px] font-medium leading-5 text-foreground">
                      {point.metric}
                    </p>
                  ) : null}
                  <p className="text-xs leading-5 text-muted-foreground">
                    {point.detail}
                  </p>
                  {point.sources?.length ? (
                    <>
                      <Separator />
                      <div className="flex flex-col gap-1">
                        {point.sources.map((source) => (
                          <a
                            key={source.url}
                            className="text-xs font-medium leading-5 text-primary underline-offset-4 hover:underline"
                            href={source.url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Källa: {source.label}
                          </a>
                        ))}
                      </div>
                    </>
                  ) : null}
                </div>
              </Popup>
            </CircleMarker>
          );
        })}
      </MapContainer>
    </div>
  );
}
