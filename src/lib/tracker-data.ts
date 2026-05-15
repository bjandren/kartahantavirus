import caseTimelineJson from "../../public/data/case-timeline.json";
import eventsJson from "../../public/data/events.json";
import locationsJson from "../../public/data/locations.json";
import metadataJson from "../../public/data/metadata.json";
import newsUpdatesJson from "../../public/data/news-updates.json";
import sourcesJson from "../../public/data/sources.json";

export type SourceLink = {
  label: string;
  url: string;
};

export type TrackerEvent = {
  id: string;
  name: string;
  date: string;
  location: string;
  lat: number;
  lng: number;
  confirmed_cases: number;
  probable_cases: number;
  additional_andv_positive_cases: number;
  suspected_cases: number;
  inconclusive_cases: number;
  total_reported_cases: number;
  deaths: number;
  monitored_people: number;
  status: string;
  risk_assessment: string;
  summary: string;
  sources: SourceLink[];
};

export type MapLocationCategory =
  | "deceased"
  | "exposure-hypothesis"
  | "infected"
  | "linked-care"
  | "medical-evacuation"
  | "monitored"
  | "planned-route"
  | "route";

export type MapLocation = {
  id: string;
  name: string;
  category: MapLocationCategory;
  lat: number;
  lng: number;
  detail: string;
  metric?: string;
  route_order?: number;
  sources: SourceLink[];
};

export type TrackerSource = {
  id: string;
  publisher: string;
  title: string;
  date: string;
  covers: string;
  url: string;
};

export type TrackerMetadata = {
  site_name: string;
  manual_update_timestamp: string;
  data_policy: string;
};

export type CaseTimelinePoint = {
  date: string;
  label: string;
  cumulative_cases: number;
  cumulative_deaths: number;
  note: string;
};

export type NewsUpdate = {
  id: string;
  date: string;
  label: string;
  title: string;
  summary: string;
  source: SourceLink;
};

export const caseTimeline = caseTimelineJson as CaseTimelinePoint[];
export const trackerEvents = eventsJson as TrackerEvent[];
export const mapLocations = locationsJson as MapLocation[];
export const trackerMetadata = metadataJson as TrackerMetadata;
export const newsUpdates = newsUpdatesJson as NewsUpdate[];
export const trackerSources = sourcesJson as TrackerSource[];
