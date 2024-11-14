"use client";
import {
  Badge,
  Card,
  Flex,
  SimpleGrid,
  Skeleton,
  Stack,
  Text,
} from "@mantine/core";
import { useFetch } from "@mantine/hooks";
import { IconBuildingStore, IconPlus } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

export interface TYPE_BRANDS {
  id: string;
  code: string;
  name: string;
  profileImage: string | null;
  createdAt: Date;
  updatedAt: Date;
  Products: [];
  chatBot: {
    id: string;
    title: string;
    question: string;
    answer: string;
    image: string | null;
    buttonLink: string[];
    keyword: string[];
    branchId: string;
  }[];
}

function Branches() {
  const router = useRouter();

  const { data: brands, loading: brandsLoading } = useFetch<TYPE_BRANDS[]>(
    `${process.env.NEXT_PUBLIC_NEXT_API}/getBrands`
  );

  const itemBrands = brands?.map((brand) => {
    return (
      <Card
        key={brand.id}
        p={"xl"}
        shadow="sm"
        radius={"md"}
        style={{ cursor: "pointer" }}
        onClick={() => router.push(`./Branches/${brand.code}`)}
      >
        <Stack gap="sm">
          <IconBuildingStore size={25} />
          <Flex direction={"column"}>
            <Text size="xl" fw={700}>
              {brand.name}
            </Text>
            <Text fs="italic" c="dimmed">
              # {brand.code}
            </Text>
          </Flex>
          <Flex justify={"start"} gap={"md"}>
            <Badge color="brand">Mobile +{brand.Products.length}</Badge>
          </Flex>
        </Stack>
      </Card>
    );
  });

  const loading = Array(15)
    .fill(0)
    .map((_, key) => {
      return <Skeleton height={200} key={key} />;
    });

  return (
    <SimpleGrid cols={{ lg: 4, sm: 2, xs: 2 }}>
      <Card
        p={"xl"}
        shadow="sm"
        radius={"md"}
        style={{ cursor: "pointer", justifyContent: "center" }}
        onClick={() => router.push("./Branches/newBranch")}
      >
        <Flex justify={"center"} align={"center"} direction={"column"}>
          <IconPlus size={50} />
          <Text>เพิ่มสาขาร้าน</Text>
        </Flex>
      </Card>
      {brandsLoading ? loading : itemBrands}
    </SimpleGrid>
  );
}

export default Branches;
