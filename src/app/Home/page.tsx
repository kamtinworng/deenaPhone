"use client";

import { Stack } from "@mantine/core";
import Banner from "./components/carousel/page";
import NewsPromotions from "./components/NewsPromotions/page";
import Products from "./components/Products/page";
import Dashboard from "./components/Dashboard/page";
import AboutUs from "./components/AboutUs/page";
// import FooterCentered from "./components/Footer/page";

function Page() {
  return (
    <div>
      <Stack gap={"xl"}>
        <Banner />
        <NewsPromotions />
        <Products />
        <Dashboard />
        <AboutUs />
        {/* <FooterCentered /> */}
      </Stack>
    </div>
  );
}

export default Page;
