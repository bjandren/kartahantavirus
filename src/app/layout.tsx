import type { Metadata } from "next";
import { Geist, JetBrains_Mono } from "next/font/google";
import "leaflet/dist/leaflet.css";
import "./globals.css";

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
  title: "Hantaviruskarta och utbrottsläge | kartahantavirus.se",
  description:
    "En källbaserad karta över MV Hondius-klustret med uppgifter från WHO, ECDC, CDC och aktuella nyhetsrapporter.",
  metadataBase: new URL("https://kartahantavirus.se"),
  openGraph: {
    title: "Hantaviruskarta och utbrottsläge",
    description:
      "Källbaserad bevakning med uppgifter från WHO, ECDC, CDC och aktuella nyhetsrapporter.",
    url: "https://kartahantavirus.se",
    siteName: "kartahantavirus.se",
    type: "website",
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
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
