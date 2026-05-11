import type { MapLocationCategory } from "@/lib/tracker-data";

export type MapCategoryStyle = {
  label: string;
  color: string;
  fillColor: string;
  radius: number;
};

export type MapFilterId =
  | "all"
  | "infected"
  | "deceased"
  | "exposure"
  | "care"
  | "monitored"
  | "route";

export type MapFilterOption = {
  id: MapFilterId;
  label: string;
  color: string;
  categories: readonly MapLocationCategory[] | null;
};

export const mapCategoryStyles: Record<MapLocationCategory, MapCategoryStyle> =
  {
    deceased: {
      label: "Dödsfall",
      color: "#020617",
      fillColor: "#020617",
      radius: 10,
    },
    "exposure-hypothesis": {
      label: "Exponeringshypotes",
      color: "#92400e",
      fillColor: "#f59e0b",
      radius: 8,
    },
    infected: {
      label: "Infekterade",
      color: "#7f1d1d",
      fillColor: "#dc2626",
      radius: 10,
    },
    "linked-care": {
      label: "Kopplad vård",
      color: "#5b21b6",
      fillColor: "#8b5cf6",
      radius: 8,
    },
    "medical-evacuation": {
      label: "Medicinsk evakuering",
      color: "#5b21b6",
      fillColor: "#8b5cf6",
      radius: 8,
    },
    monitored: {
      label: "Under bevakning",
      color: "#1d4ed8",
      fillColor: "#60a5fa",
      radius: 8,
    },
    "planned-route": {
      label: "Planerad rutt",
      color: "#334155",
      fillColor: "#94a3b8",
      radius: 7,
    },
    route: {
      label: "Kryssningsrutt",
      color: "#334155",
      fillColor: "#64748b",
      radius: 6,
    },
  };

export const fallbackMapCategoryStyle: MapCategoryStyle = {
  label: "Kartpunkt",
  color: "#334155",
  fillColor: "#94a3b8",
  radius: 7,
};

export const mapFilterOptions: readonly MapFilterOption[] = [
  {
    id: "all",
    label: "Alla",
    color: "var(--foreground)",
    categories: null,
  },
  {
    id: "infected",
    label: "Infekterade",
    color: mapCategoryStyles.infected.fillColor,
    categories: ["infected"],
  },
  {
    id: "deceased",
    label: "Dödsfall",
    color: mapCategoryStyles.deceased.fillColor,
    categories: ["deceased"],
  },
  {
    id: "exposure",
    label: "Exponeringshypotes",
    color: mapCategoryStyles["exposure-hypothesis"].fillColor,
    categories: ["exposure-hypothesis"],
  },
  {
    id: "care",
    label: "Vård/evakuering",
    color: mapCategoryStyles["medical-evacuation"].fillColor,
    categories: ["linked-care", "medical-evacuation"],
  },
  {
    id: "monitored",
    label: "Under bevakning",
    color: mapCategoryStyles.monitored.fillColor,
    categories: ["monitored"],
  },
  {
    id: "route",
    label: "Rutt",
    color: mapCategoryStyles.route.fillColor,
    categories: ["planned-route", "route"],
  },
];
