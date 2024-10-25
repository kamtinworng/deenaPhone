"use client";
import {
  Card,
  CardSection,
  Container,
  SimpleGrid,
  TextInput,
  Image,
  Group,
  Text,
  Badge,
  Button,
  Select,
  Grid,
} from "@mantine/core";
import { useFetch } from "@mantine/hooks";
import { Products } from "../Files/page";
import { useRouter } from "next/navigation";
import { IconSearch } from "@tabler/icons-react";
import { useState } from "react";

function SellSystem() {
  const [search, setSearch] = useState("");
  const [branch, setBranch] = useState<string | null>("");

  const { data } = useFetch<Products>(
    `${process.env.NEXT_PUBLIC_NEXT_API}/getProducts?search=${search}`
  );

  const { data: getBranch } = useFetch<
    {
      code: string;
      name: string;
    }[]
  >(`${process.env.NEXT_PUBLIC_NEXT_API}/getBrands`);

  const products = data?.findProducts.filter((f) => f.status !== "SoldOut");

  const router = useRouter();

  const rowProducts = products?.map((product) => {
    return (
      <Card shadow="md" radius={"md"} key={product.id}>
        <CardSection>
          <Image alt="image product" src={product.images[0]} h={250} />
        </CardSection>
        <Card.Section p={"lg"}>
          <Group justify="space-between">
            <Text fz="lg" fw={500}>
              {product.deviceName}
            </Text>
            <Badge size="sm" variant="light">
              {product.branch.name}
            </Badge>
          </Group>
          <Text fz="sm" mt="xs">
            {product.deviceDetail}
          </Text>
        </Card.Section>

        <Card.Section>
          <Button
            fullWidth
            radius={0}
            color="brand"
            onClick={() => router.push(`./SellSystem/${product.id}`)}
          >
            SELECT
          </Button>
        </Card.Section>
      </Card>
    );
  });

  return (
    <>
      <Container fluid>
        <Grid grow>
          <Grid.Col span={{ xl: "auto", lg: "auto", md: 5 }}>
            <Select
              data={getBranch?.map((branch) => {
                return {
                  value: branch.code,
                  label: branch.name,
                };
              })}
              onChange={(e) => setBranch(e)}
              value={branch}
              size="md"
              radius={"md"}
              placeholder="สาขา"
            ></Select>
          </Grid.Col>
          <Grid.Col span={{ xl: 7, lg: 7, md: 10, sm: 10, xs: 10 }}>
            <TextInput
              leftSection={<IconSearch size={14} />}
              radius={"md"}
              size="md"
              placeholder="ค้าหาสินค้า"
              onChange={(e) => {
                setSearch(e.currentTarget.value);
              }}
            />
          </Grid.Col>
        </Grid>
      </Container>
      <SimpleGrid
        mt={"lg"}
        cols={{ lg: 4, md: 2, sm: 1 }}
        spacing="md"
        verticalSpacing="md"
      >
        {rowProducts}
      </SimpleGrid>
    </>
  );
}

export default SellSystem;
