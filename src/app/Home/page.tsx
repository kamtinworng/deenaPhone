"use client";
import { Center, Divider, Stack, Title } from "@mantine/core";
import Banner from "./components/carousel/page";
import Mobile from "../../../libs/mobile";
import { NewsPromotions } from "./components/NewsPromotions/page";
import { Products } from "./components/Products/page";
import { Review } from "./components/Review/page";
import { AboutMe } from "./components/AboutMe/page";
import Contact from "./components/Contact/page";

function Page() {
  return (
    <div>
      <Stack>
        <Banner />
        <Center mt={"md"}>
          <Title c={"brand"} order={Mobile() ? 2 : 1}>
            ข่าวสาร และ โปรโมชั่น
          </Title>
        </Center>
        <NewsPromotions />
        <Center mt={"md"}>
          <Title c={"brand"} order={Mobile() ? 2 : 1}>
            สินค้า
          </Title>
        </Center>
        <Products />
        <Center mt={"md"}>
          <Title c={"brand"} order={Mobile() ? 2 : 1}>
            รีวิวจากลูกค้า
          </Title>
        </Center>
        <Review />
        <Divider />
        <AboutMe />
        <Divider />
        <Center mt={"md"}>
          <Title c={"brand"} order={Mobile() ? 2 : 1}>
            ติดต่อ
          </Title>
        </Center>
        <Contact />
      </Stack>
    </div>
  );
}

export default Page;
