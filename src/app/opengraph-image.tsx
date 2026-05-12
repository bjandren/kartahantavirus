import { ImageResponse } from "next/og";

import { mapLocations, trackerEvents } from "@/lib/tracker-data";

export const alt =
  "Karta över hantavirusutbrottet med aktuell fallstatistik och källbaserad bevakning.";
export const dynamic = "force-static";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

type ProjectedPoint = {
  id: string;
  name: string;
  x: number;
  y: number;
};

const mapFrame = {
  left: 646,
  top: 118,
  width: 474,
  height: 376,
};

function projectPoint(lat: number, lng: number): Pick<ProjectedPoint, "x" | "y"> {
  const bounds = {
    minLng: -72,
    maxLng: -4,
    minLat: -58,
    maxLat: 31,
  };

  return {
    x:
      mapFrame.left +
      ((lng - bounds.minLng) / (bounds.maxLng - bounds.minLng)) *
        mapFrame.width,
    y:
      mapFrame.top +
      ((bounds.maxLat - lat) / (bounds.maxLat - bounds.minLat)) *
        mapFrame.height,
  };
}

function statPill(label: string, value: string, tone: string) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 7,
        minWidth: 154,
        padding: "16px 18px",
        borderRadius: 18,
        background: "rgba(255, 255, 255, 0.78)",
        border: "1px solid rgba(15, 23, 42, 0.08)",
        boxShadow: "0 12px 36px rgba(15, 23, 42, 0.08)",
      }}
    >
      <div
        style={{
          color: "#475569",
          fontSize: 24,
          fontWeight: 700,
          lineHeight: 1,
        }}
      >
        {label}
      </div>
      <div
        style={{
          color: tone,
          fontSize: 52,
          fontWeight: 800,
          letterSpacing: "-0.02em",
          lineHeight: 1,
        }}
      >
        {value}
      </div>
    </div>
  );
}

export default function Image() {
  const event = trackerEvents[0];
  const routePoints = [...mapLocations]
    .filter((location) => typeof location.route_order === "number")
    .sort((left, right) => (left.route_order ?? 0) - (right.route_order ?? 0))
    .map((location) => ({
      id: location.id,
      name: location.name,
      ...projectPoint(location.lat, location.lng),
    }));
  const polyline = routePoints.map((point) => `${point.x},${point.y}`).join(" ");
  const keyPoints = routePoints.filter((point) =>
    ["ushuaia", "st-helena", "mv-hondius-cabo-verde", "tenerife-repatriation"].includes(
      point.id,
    ),
  );

  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          display: "flex",
          width: "100%",
          height: "100%",
          overflow: "hidden",
          background: "#f8fbfb",
          color: "#0f172a",
          fontFamily: "Arial, Helvetica, sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at 17% 16%, rgba(34, 197, 94, 0.18), transparent 28%), radial-gradient(circle at 88% 26%, rgba(14, 165, 233, 0.2), transparent 30%), linear-gradient(135deg, #f8fbfb 0%, #ecf8f6 52%, #fef7ed 100%)",
          }}
        />

        <div
          style={{
            position: "absolute",
            left: 78,
            top: 66,
            display: "flex",
            flexDirection: "column",
            width: 520,
            gap: 28,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              color: "#0f766e",
              fontSize: 26,
              fontWeight: 800,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}
          >
            <span
              style={{
                display: "flex",
                width: 16,
                height: 16,
                borderRadius: 999,
                background: "#dc2626",
                boxShadow: "0 0 0 8px rgba(220, 38, 38, 0.14)",
              }}
            />
            kartahantavirus.se
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 18,
            }}
          >
            <div
              style={{
                color: "#0f172a",
                fontSize: 66,
                fontWeight: 900,
                letterSpacing: "-0.03em",
                lineHeight: 0.96,
              }}
            >
              Senaste nytt & karta över hantavirusutbrottet
            </div>
            <div
              style={{
                color: "#334155",
                fontSize: 32,
                fontWeight: 700,
                lineHeight: 1.22,
              }}
            >
              Källbaserad bevakning med uppgifter från WHO, ECDC, CDC och
              aktuella nyhetsrapporter.
            </div>
          </div>

          <div style={{ display: "flex", gap: 12 }}>
            {statPill("fall", String(event.total_reported_cases), "#dc2626")}
            {statPill("dödsfall", String(event.deaths), "#111827")}
            {statPill("bevakade", String(event.monitored_people), "#2563eb")}
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            left: 616,
            top: 78,
            width: 546,
            height: 474,
            borderRadius: 32,
            background: "rgba(255, 255, 255, 0.8)",
            border: "1px solid rgba(15, 23, 42, 0.1)",
            boxShadow: "0 28px 80px rgba(15, 23, 42, 0.14)",
          }}
        />

        <svg
          width={546}
          height={474}
          viewBox="0 0 546 474"
          style={{
            position: "absolute",
            left: 616,
            top: 78,
          }}
        >
          <defs>
            <linearGradient id="sea" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0%" stopColor="#ecfeff" />
              <stop offset="100%" stopColor="#dff7ef" />
            </linearGradient>
            <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow
                dx="0"
                dy="12"
                floodColor="#0f172a"
                floodOpacity="0.14"
                stdDeviation="14"
              />
            </filter>
          </defs>

          <rect x="0" y="0" width="546" height="474" rx="32" fill="url(#sea)" />
          <path
            d="M9 74 C72 51 124 58 164 95 C204 132 219 169 267 163 C324 156 348 101 394 91 C447 80 494 104 536 139"
            fill="none"
            stroke="#bae6fd"
            strokeWidth="32"
            strokeLinecap="round"
            opacity="0.55"
          />
          <path
            d="M43 366 C111 337 172 336 226 358 C281 381 337 413 415 392 C463 379 500 352 535 328"
            fill="none"
            stroke="#a7f3d0"
            strokeWidth="42"
            strokeLinecap="round"
            opacity="0.55"
          />
          <path
            d="M122 74 C88 113 83 155 104 200 C133 261 109 323 67 375"
            fill="none"
            stroke="#fef3c7"
            strokeWidth="28"
            strokeLinecap="round"
            opacity="0.75"
          />
          <polyline
            points={polyline
              .split(" ")
              .map((pair) => {
                const [x, y] = pair.split(",").map(Number);
                return `${x - 616},${y - 78}`;
              })
              .join(" ")}
            fill="none"
            stroke="#334155"
            strokeDasharray="10 12"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="4"
            opacity="0.76"
          />
        </svg>

        {routePoints.map((point) => {
          const active = ["mv-hondius-cabo-verde", "tenerife-repatriation"].includes(
            point.id,
          );

          return (
            <div
              key={point.id}
              style={{
                position: "absolute",
                left: point.x - 9,
                top: point.y - 9,
                display: "flex",
                width: active ? 22 : 17,
                height: active ? 22 : 17,
                borderRadius: 999,
                background: active ? "#dc2626" : "#475569",
                border: "3px solid white",
                boxShadow: active
                  ? "0 0 0 10px rgba(220, 38, 38, 0.14), 0 8px 20px rgba(15, 23, 42, 0.22)"
                  : "0 7px 18px rgba(15, 23, 42, 0.18)",
              }}
            />
          );
        })}

        {keyPoints.map((point) => (
          <div
            key={`${point.id}-label`}
            style={{
              position: "absolute",
              left: point.x + 14,
              top: point.y - 13,
              display: "flex",
              padding: "6px 10px",
              borderRadius: 999,
              background: "rgba(255, 255, 255, 0.86)",
              color: "#0f172a",
              fontSize: 20,
              fontWeight: 800,
              boxShadow: "0 8px 22px rgba(15, 23, 42, 0.12)",
            }}
          >
            {point.name.replace("MV Hondius, ", "")}
          </div>
        ))}

        <div
          style={{
            position: "absolute",
            left: 654,
            top: 506,
            display: "flex",
            alignItems: "center",
            gap: 10,
            color: "#475569",
            fontSize: 22,
            fontWeight: 700,
          }}
        >
          <span
            style={{
              display: "flex",
              width: 12,
              height: 12,
              borderRadius: 999,
              background: "#dc2626",
            }}
          />
          Rutt, klusterplatser och aktuella lägespunkter
        </div>
      </div>
    ),
    size,
  );
}
