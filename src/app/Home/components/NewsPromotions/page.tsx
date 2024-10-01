"use client";
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

function NewsPromotions() {
  const mockData = [
    { image: "/summ-ip16.jpg", type: "news" },
    { image: "/image1.jpg", type: "promotion" },
    { image: "/image1.jpg", type: "news" },
  ];

  const cardNewsORPromotions = mockData.map((data, index) => {
    return (
      <Card mt={"lg"} padding="lg" key={index}>
        <Card.Section>
          <Image src={data.image} radius={"md"} height={300} alt="Norway" />
        </Card.Section>

        <Group justify="space-between" mt="md" mb="xs">
          <Text fw={500}>Norway Fjord Adventures</Text>
          <Badge color={data.type === "news" ? "blue" : "brand"}>
            {data.type}
          </Badge>
        </Group>

        <Text size="sm" c="dimmed">
          With Fjord Tours you can explore more of the magical fjord landscapes
          with tours and activities on and around the fjords of Norway
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
      <Flex justify={"center"} direction={"column"} align={"center"}>
        <Title c={"brand"}>ข่าวสาร อัพเดตจากทางร้าน</Title>
        <Text size="lg" ff={"text"}>
          Learn how to grow your business with our expert advice.
        </Text>
      </Flex>
      <SimpleGrid cols={3} spacing="md" verticalSpacing="md">
        {cardNewsORPromotions}
      </SimpleGrid>
    </Box>
  );
}

export default NewsPromotions;
