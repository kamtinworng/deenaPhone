import { Flex, Title, Text } from "@mantine/core";

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
      <Flex justify={"center"} direction={"column"} align={"center"}>
        <Title c={"brand"}>ข่าวสาร อัพเดตจากทางร้าน</Title>
        <Text size="lg" ff={"text"}>
          Learn how to grow your business with our expert advice.
        </Text>
      </Flex>
    </div>
  );
}
