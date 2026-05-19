"use client";

import { ExternalLinkIcon } from "lucide-react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import type { NewsUpdate } from "@/lib/tracker-data";

export type NewsCarouselProps = {
  updates: NewsUpdate[];
};

export function NewsCarousel({ updates }: NewsCarouselProps) {
  return (
    <Carousel
      aria-label="Senaste nyheter"
      className="w-full"
      opts={{ align: "start" }}
    >
      <CarouselContent className="-ml-3">
        {updates.map((update) => (
          <CarouselItem
            key={update.id}
            className="basis-full pl-3 sm:basis-1/2 lg:basis-1/3"
          >
            <article className="flex h-full min-h-[17rem] flex-col gap-2 rounded-lg border bg-background p-3">
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
                className="mt-auto inline-flex items-center gap-1 text-xs font-medium text-muted-foreground underline-offset-4 hover:underline"
                href={update.source.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                Källa: {update.source.label}
                <ExternalLinkIcon data-icon="inline-end" />
              </a>
            </article>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="mt-4 flex justify-end gap-2">
        <CarouselPrevious
          aria-label="Visa föregående nyhet"
          className="static translate-x-0 translate-y-0"
        />
        <CarouselNext
          aria-label="Visa nästa nyhet"
          className="static translate-x-0 translate-y-0"
        />
      </div>
    </Carousel>
  );
}
