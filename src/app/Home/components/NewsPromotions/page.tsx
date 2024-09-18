import {
  Card,
  Image,
  Avatar,
  Text,
  Group,
  Flex,
  SimpleGrid,
  // Container,
} from "@mantine/core";
import classes from "./ArticleCardVertical.module.css";
import Mobile from "../../../../../libs/mobile";

export function NewsPromotions() {
  const mockData = [
    { image: "/summ-ip16.jpg" },
    { image: "/image1.jpg" },
    { image: "/image1.jpg" },
    { image: "/summ-ip16.jpg" },
    { image: "/summ-ip16.jpg" },
    { image: "/summ-ip16.jpg" },
  ];

  return (
    <div>
      {/* <Container size={"xl"}> */}
      <SimpleGrid cols={{ base: 1, md: 3 }} mt={"md"}>
        {mockData.map((image, index) => {
          return (
            <Card withBorder radius="md" p={0} key={index}>
              <Flex
                wrap="nowrap"
                direction={Mobile() ? "column" : "row"}
                gap={0}
                h={"100%"}
              >
                <Image
                  fit="fill"
                  src={image.image}
                  height={160}
                  alt="Products"
                />
                <Flex
                  direction={"column"}
                  justify={"space-between"}
                  className={classes.body}
                >
                  <Text tt="uppercase" c="dimmed" fw={700} size="xs">
                    technology
                  </Text>
                  <Text className={classes.title} mt="xs" mb="md">
                    The best laptop for Frontend engineers in 2022
                  </Text>
                  <Group wrap="nowrap" gap="xs">
                    <Group gap="xs" wrap="nowrap">
                      <Avatar size={20} src="/logo.jpg" />
                      <Text size="xs">Deena Phone</Text>
                    </Group>
                    <Text size="xs" c="dimmed">
                      •
                    </Text>
                    <Text size="xs" c="dimmed">
                      Feb 6th
                    </Text>
                  </Group>
                </Flex>
              </Flex>
            </Card>
          );
        })}
      </SimpleGrid>
      {/* </Container> */}
    </div>
  );
}
