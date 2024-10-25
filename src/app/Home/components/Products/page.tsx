"use client";

import {
  Card,
  Container,
  Flex,
  Group,
  SimpleGrid,
  Title,
  Text,
  Image,
  NumberFormatter,
  Anchor,
} from "@mantine/core";
import { useFetch } from "@mantine/hooks";
import Mobile from "../../../../../libs/mobile";
export interface Products {
  findProducts: {
    id: string;
    images: string[];
    deviceName: string;
    deviceDetail: string;
    indentifier: string;
    price: number; // ราคาเต็ม
    deposit: number; // เงินดาวน์
    numberOfInstallments: string; // จำนวนงวด
    icloud: string | null;
    passwordIcloud: string | null;
    lockscreen: string;
    idLoad: string;
    status: "ForSale" | "SoldOut";
    passwordIdLoad: string;
    branch: { name: string };
  }[];
  countFindInstallmentPayments: number;
}
function Products() {
  const { data: products } = useFetch<Products>(
    `${
      process.env.NEXT_PUBLIC_NEXT_API as string
    }/getProducts?search=${""}&page=${1}&limit=${4}`
  );

  const cardNewsORPromotions = products?.findProducts.map((data, index) => {
    return (
      <Card mt={"lg"} padding="lg" key={index}>
        <Card.Section>
          <Image
            src={data.images[0]}
            radius={"md"}
            height={400}
            width={150}
            alt="product"
          />
        </Card.Section>

        <Group justify="space-between" mt="md" mb="xs">
          <Text fw={500}>{data.deviceName}</Text>
          <NumberFormatter prefix="฿ " value={data.price} thousandSeparator />
        </Group>

        <Text size="sm" c="dimmed">
          {data.deviceDetail}
        </Text>
      </Card>
    );
  });

  return (
    <Container fluid bg={"white"} h={"100%"} w={"100vw"}>
      <Flex
        justify={Mobile() ? "flex-start" : "space-between"}
        direction={Mobile() ? "column" : "row"}
        mt={"lg"}
        align={Mobile() ? "start" : "center"}
      >
        <Title mt={"sm"} order={Mobile() ? 4 : 2} c={"brand"}>
          Products / ผลิตภัณฑ์
        </Title>
        <Anchor c={"brand"}>{`view all products >`}</Anchor>
      </Flex>

      <SimpleGrid
        cols={{ lg: 4, sm: 3, xs: 1 }}
        spacing="xl"
        verticalSpacing="xl"
      >
        {cardNewsORPromotions}
      </SimpleGrid>
    </Container>
  );
}

export default Products;
