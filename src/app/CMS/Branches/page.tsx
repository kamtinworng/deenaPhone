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
import { IconBuildingStore, IconPlus } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { GetBranchs } from "./loader";
import { notifications } from "@mantine/notifications";

export interface TYPE_BRANDS {
  code: string;
  id: string;
  name: string;
  _count: {
    Products: number;
  };
}

function Branches() {
  const router = useRouter();
  const [brands, setBrands] = useState<TYPE_BRANDS[]>([]);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    const fetchData = async () => {
      const res = await GetBranchs()
      if (res.status !== 200) {
        notifications.show({
          message: res.message,
          color: 'red'
        })
        setLoading(false)
      }
      setBrands(res.data)
      setLoading(false)
    }
    fetchData()
  }, [])


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
            <Badge color="brand">Mobile +{brand._count.Products}</Badge>
          </Flex>
        </Stack>
      </Card>
    );
  });

  const loadingBrand = Array(15)
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
      {loading ? loadingBrand : itemBrands}
    </SimpleGrid>
  );
}

export default Branches;
