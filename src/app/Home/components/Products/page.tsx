"use client";

import {
  Button,
  Card,
  Container,
  Flex,
  Group,
  SimpleGrid,
  Title,
  Text,
  Image,
  NumberFormatter,
} from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";

function Products() {
  const mockData = [
    { image: "/phone1.jpg", type: "news" },
    { image: "/phone2.jpg", type: "promotion" },
    { image: "/phone3.jpg", type: "news" },
    { image: "/phone4.jpg", type: "promotion" },
  ];

  const cardNewsORPromotions = mockData.map((data, index) => {
    return (
      <Card mt={"lg"} padding="lg" key={index}>
        <Card.Section>
          <Image
            src={data.image}
            radius={"md"}
            height={400}
            width={150}
            alt="product"
          />
        </Card.Section>

        <Group justify="space-between" mt="md" mb="xs">
          <Text fw={500}>Iphone16</Text>
          <NumberFormatter prefix="฿ " value={1000000} thousandSeparator />
        </Group>

        <Text size="sm" c="dimmed">
          Black
        </Text>
      </Card>
    );
  });

  return (
    <Container fluid bg={"white"} h={"100%"} w={"100vw"}>
      <Flex justify={"space-between"} mt={"lg"}>
        <Title order={2} c={"brand"}>
          Products / ผลิตภัณฑ์
        </Title>
        <Button
          component="a"
          td="underline"
          c={"brand"}
          variant="transparent"
          rightSection={<IconChevronRight size={14} />}
        >
          view all products
        </Button>
      </Flex>

      <SimpleGrid cols={4} spacing="xl" verticalSpacing="xl">
        {cardNewsORPromotions}
      </SimpleGrid>
    </Container>
  );
}

export default Products;
