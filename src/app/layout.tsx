import type { Metadata } from "next";
import "./globals.css";
import "@mantine/core/styles.css";
import "@mantine/carousel/styles.css";
import "@mantine/dropzone/styles.css";
import {
  createTheme,
  MantineColorsTuple,
  MantineProvider,
} from "@mantine/core";
import SessionProviderCustom from "./provider/provider";
import { Kanit } from "next/font/google";

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
    brand: brand,
  },
});

const kanit = Kanit({
  weight: ["200"],
  subsets: ["thai"],
  variable: "--font-Kanit",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={kanit.className}>
        <MantineProvider theme={theme} defaultColorScheme="light">
          <SessionProviderCustom>{children}</SessionProviderCustom>
        </MantineProvider>
      </body>
    </html>
  );
}
