import type { Metadata } from "next";
import "./globals.css";
import "@mantine/core/styles.css";
import "@mantine/carousel/styles.css";
import {
  createTheme,
  MantineColorsTuple,
  MantineProvider,
} from "@mantine/core";
import SessionProviderCustom from "./provider/provider";
import { Mitr } from "next/font/google";
export const metadata: Metadata = {
  title: "Deena Phone",
  description: "Create by Munintorn.k",
};

const brand: MantineColorsTuple = [
  "#ffe7f3",
  "#ffcee2",
  "#ff9bbf",
  "#ff649c",
  "#fe377e",
  "#fe196b",
  "#ff0262",
  "#e40051",
  "#cb0048",
  "#b3003d",
];

const theme = createTheme({
  colors: {
    brand,
  },
});

const mitr = Mitr({
  weight: ["200"],
  subsets: ["thai"],
  variable: "--font-Mitr",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={mitr.className}>
      <body>
        <MantineProvider theme={theme} defaultColorScheme="light">
          <SessionProviderCustom>{children}</SessionProviderCustom>
        </MantineProvider>
      </body>
    </html>
  );
}
