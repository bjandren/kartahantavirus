import type { Metadata } from "next";
import { Geist, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "leaflet/dist/leaflet.css";
import "./globals.css";

const siteUrl = "https://kartahantavirus.se";
const previewTitle = "Senaste nytt & karta över hantavirusutbrottet";
const previewDescription =
  "Källbaserad bevakning av MV Hondius-klustret med karta, tidslinje och uppgifter från WHO, ECDC, CDC och aktuella nyhetsrapporter.";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: `${previewTitle} | kartahantavirus.se`,
  description: previewDescription,
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: previewTitle,
    description: previewDescription,
    url: siteUrl,
    siteName: "kartahantavirus.se",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: previewTitle,
    description: previewDescription,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="sv"
      className={`${geistSans.variable} ${jetBrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
