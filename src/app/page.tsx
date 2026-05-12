import { ExternalLinkIcon } from "lucide-react";

import { CasesOverTimeChart } from "@/components/cases-over-time-chart";
import { MapPanel } from "@/components/map-panel";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  caseTimeline,
  mapLocations,
  newsUpdates,
  trackerEvents,
  trackerMetadata,
  trackerSources,
} from "@/lib/tracker-data";

export const dynamic = "force-static";

export default function Home() {
  const currentEvent = trackerEvents[0];
  const currentDeaths = caseTimeline.at(-1)?.cumulative_deaths ?? 0;
  const lastUpdated = new Intl.DateTimeFormat("sv-SE", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Europe/Stockholm",
  }).format(new Date(trackerMetadata.manual_update_timestamp));
  const latestCaseSource = {
    label: "AP/WHO",
    url: "https://apnews.com/article/hantavirus-outbreak-hondius-cruise-ship-ac42357c5c3ae1694a93f1d43ba38bdb",
  };

  const stats = [
    {
      label: "Bekräftade fall",
      value: currentEvent.confirmed_cases,
      sourceLabel: latestCaseSource.label,
      sourceUrl: latestCaseSource.url,
    },
    {
      label: "Sannolika fall",
      value: currentEvent.probable_cases,
      sourceLabel: latestCaseSource.label,
      sourceUrl: latestCaseSource.url,
    },
    {
      label: "Totalt rapporterade",
      value: currentEvent.total_reported_cases,
      sourceLabel: latestCaseSource.label,
      sourceUrl: latestCaseSource.url,
    },
    {
      label: "Dödsfall",
      value: currentDeaths,
      sourceLabel: latestCaseSource.label,
      sourceUrl: latestCaseSource.url,
    },
    {
      label: "Exponerade ombord",
      value: currentEvent.monitored_people,
      sourceLabel: "WHO",
      sourceUrl:
        "https://www.who.int/emergencies/disease-outbreak-news/item/2026-DON600",
    },
  ];
  const sortedTrackerSources = [...trackerSources].sort((left, right) =>
    right.date.localeCompare(left.date),
  );

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-5 px-4 py-6 sm:px-6 lg:px-8">
        <header className="mx-auto flex w-full max-w-5xl flex-col gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary">
              Uppdaterad <span className="font-mono">{lastUpdated}</span>
            </Badge>
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="flex items-center gap-2 text-2xl font-semibold leading-tight tracking-normal sm:text-3xl">
              <span
                aria-hidden="true"
                className="grid size-9 shrink-0 place-items-center rounded-lg bg-card text-2xl shadow-xs ring-1 ring-border sm:size-10 sm:text-3xl"
              >
                🦠
              </span>
              <span>Kartahantavirus.se</span>
            </h1>
          </div>
        </header>

        <section className="mx-auto grid w-full max-w-5xl gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {stats.map((stat) => (
            <Card key={stat.label} size="sm">
              <CardHeader>
                <CardDescription>{stat.label}</CardDescription>
                <CardTitle className="font-mono text-2xl tabular-nums">
                  {stat.value}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <a
                  className="text-xs font-medium text-muted-foreground underline-offset-4 hover:underline"
                  href={stat.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Källa: {stat.sourceLabel}
                </a>
              </CardContent>
            </Card>
          ))}
        </section>

        <Card className="mx-auto w-full max-w-5xl">
          <CardHeader className="border-b">
            <CardTitle>Fall över tid</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <CasesOverTimeChart data={caseTimeline} />
          </CardContent>
        </Card>

        <Card className="mx-auto w-full max-w-5xl">
          <CardHeader className="border-b">
            <CardTitle>Karta</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <MapPanel locations={mapLocations} />
          </CardContent>
        </Card>

        <Card className="mx-auto w-full max-w-5xl">
          <CardHeader className="border-b">
            <CardTitle>Senaste nytt</CardTitle>
            <CardDescription>
              Officiell baslinje först; nyhetsrapporter markeras separat tills
              nästa WHO/ECDC-uppdatering.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-3">
            {newsUpdates.map((update) => (
              <article key={update.id} className="flex flex-col gap-2">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="secondary">{update.label}</Badge>
                  <span className="font-mono text-xs text-muted-foreground">
                    {update.date}
                  </span>
                </div>
                <h2 className="text-sm font-semibold leading-5">
                  {update.title}
                </h2>
                <p className="text-sm leading-6 text-muted-foreground">
                  {update.summary}
                </p>
                <a
                  className="mt-auto inline-flex text-xs font-medium text-muted-foreground underline-offset-4 hover:underline"
                  href={update.source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Källa: {update.source.label}
                </a>
              </article>
            ))}
          </CardContent>
        </Card>

        <Separator />

        <section id="sources" className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <h2 className="text-base font-medium leading-none">Källor</h2>
            <p className="text-sm text-muted-foreground">
              Officiella källor som används för den aktuella statiska datan.
            </p>
          </div>

          <div className="overflow-hidden rounded-lg border bg-card">
            <Table className="min-w-[1024px]">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[30rem]">Källa</TableHead>
                  <TableHead className="w-28" aria-sort="descending">
                    Datum
                  </TableHead>
                  <TableHead className="w-[30rem]">Innehåll</TableHead>
                  <TableHead className="w-24 pr-3 text-right">Länk</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedTrackerSources.map((source) => (
                  <TableRow key={source.id}>
                    <TableCell className="min-w-[24rem] whitespace-normal font-medium leading-5">
                      {source.publisher}: {source.title}
                    </TableCell>
                    <TableCell className="font-mono text-xs text-muted-foreground">
                      {source.date}
                    </TableCell>
                    <TableCell className="min-w-[24rem] whitespace-normal leading-5 text-muted-foreground">
                      {source.covers}
                    </TableCell>
                    <TableCell className="pr-3 text-right">
                      <a
                        className={buttonVariants({
                          size: "sm",
                          variant: "ghost",
                        })}
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Öppna
                        <ExternalLinkIcon data-icon="inline-end" />
                      </a>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </section>
      </div>
    </main>
  );
}
