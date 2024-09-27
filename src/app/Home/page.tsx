"use client";

import { Stack } from "@mantine/core";
import Banner from "./components/carousel/page";
import { NewsPromotions } from "./components/NewsPromotions/page";

function Page() {
  return (
    <div>
      <Stack gap={"xl"}>
        <Banner />
        <NewsPromotions />
      </Stack>
    </div>
  );
}

export default Page;
