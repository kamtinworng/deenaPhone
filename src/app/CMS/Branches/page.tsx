"use client";
import { Card, Flex, SimpleGrid, Text } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

function Branches() {
  const router = useRouter();
  return (
    <SimpleGrid cols={4}>
      <Card
        p={"xl"}
        shadow="sm"
        radius={"md"}
        style={{ cursor: "pointer" }}
        onClick={() => router.push("./Branches/newBranch")}
      >
        <Flex justify={"center"} align={"center"} direction={"column"}>
          <IconPlus size={50} />
          <Text>เพิ่มสาขาร้าน</Text>
        </Flex>
      </Card>
    </SimpleGrid>
  );
}

export default Branches;
