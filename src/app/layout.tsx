import type { Metadata } from "next";
import "./globals.css";
import "@mantine/core/styles.css";
import "@mantine/carousel/styles.css";
import "@mantine/dropzone/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/charts/styles.css";
import {
  createTheme,
  MantineColorsTuple,
  MantineProvider,
} from "@mantine/core";
import SessionProviderCustom from "./provider/provider";
import { Kanit } from "next/font/google";
import { DatesProvider } from "@mantine/dates";
import { Notifications } from "@mantine/notifications";
import { ModalsProvider } from "@mantine/modals";

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
  variable: "--font-kanit",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "700"],
});
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <body className={kanit.variable}>
        <MantineProvider theme={theme}>
          <SessionProviderCustom>
            <Notifications />
            <ModalsProvider>
              <DatesProvider settings={{ locale: "th" }}>
                {children}
              </DatesProvider>
            </ModalsProvider>
          </SessionProviderCustom>
        </MantineProvider>
      </body>
    </html>
  );
}
