# kartahantavirus.se

Statisk hantavirusbevakning byggd med Next.js, shadcn/ui, Tailwind, Recharts och Leaflet.

## MVP

- Källbaserad startsida med graf över fall över tid
- Klientkarta med Leaflet, OpenStreetMap, färgkodade klusterpunkter och källor per pin
- Statisk JSON-data i `public/data/*.json`
- Senaste nytt-sektion som separerar officiella baslinjer från nyhetsrapporter
- Källtabell för WHO, ECDC, CDC och nyhetskällor
- Statisk export via `next build`

## Lokal utveckling

```bash
npm install
npm run dev
```

Öppna http://localhost:3000.

## Statisk lanseringsbuild

```bash
npm run build
npm run start
```

`npm run build` skriver en statisk export till `out/`. Publicera `out/` på Cloudflare Pages, eller publicera repot direkt på Vercel.

## Uppdatera data

Manuell data för lanseringen finns i:

- `public/data/events.json`
- `public/data/case-timeline.json`
- `public/data/locations.json`
- `public/data/news-updates.json`
- `public/data/sources.json`
- `public/data/metadata.json`

Efter ändringar:

```bash
npm run lint
npm run build
```

Sajten använder avsiktligt ingen databas, inga serverless-API-rutter, ingen liveskrapning och ingen marknadspollning.
