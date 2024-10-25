"use client";
import { typeBlog } from "@/app/CMS/blog/page";
import {
  Flex,
  Title,
  Text,
  Card,
  Image,
  Badge,
  Group,
  SimpleGrid,
  Avatar,
  Box,
} from "@mantine/core";
import { useFetch } from "@mantine/hooks";
import Mobile from "../../../../../libs/mobile";

function NewsPromotions() {
  const { data: blogs } = useFetch<typeBlog>(
    `${
      process.env.NEXT_PUBLIC_NEXT_API as string
    }/getBlogs?search=${""}&page=1&limit=3`
  );

  const cardNewsORPromotions = blogs?.findBlogs.map((data, index) => {
    return (
      <Card mt={"lg"} padding="lg" key={index}>
        <Card.Section>
          <Image src={data.image} radius={"md"} height={300} alt="Norway" />
        </Card.Section>

        <Group justify="space-between" mt="md" mb="xs">
          <Text fw={500}>{data.title}</Text>
          <Badge color={data.typeBlog === "news" ? "blue" : "brand"}>
            {data.typeBlog}
          </Badge>
        </Group>

        <Text size="sm" c="dimmed">
          {data.detail}
        </Text>

        <Card.Section p={"md"}>
          <Flex direction={"row"} align={"center"} gap={"sm"}>
            <Avatar src="/logo.jpg" alt="it's me" />
            <Text>Deena Phone</Text>
          </Flex>
        </Card.Section>
      </Card>
    );
  });

  return (
    <Box m={"md"}>
      <Flex
        justify={"center"}
        direction={"column"}
        align={Mobile() ? "start" : "center"}
      >
        <Title c={"brand"} order={Mobile() ? 4 : 1}>
          ข่าวสาร อัพเดตจากทางร้าน
        </Title>
        <Text size={Mobile() ? "sm" : "lg"} ff={"text"}>
          Learn how to grow your business with our expert advice.
        </Text>
      </Flex>
      <SimpleGrid
        cols={{ lg: 3, md: 2, xs: 1 }}
        spacing="md"
        verticalSpacing="md"
      >
        {cardNewsORPromotions}
      </SimpleGrid>
    </Box>
  );
}

export default NewsPromotions;
