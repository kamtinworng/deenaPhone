"use client";
import {
  Paper,
  Table,
  Pagination,
  Center,
  Flex,
  Title,
  TextInput,
  Image,
  Button,
} from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { useDebouncedState, useFetch } from "@mantine/hooks";
import { useRouter } from "next/navigation";
import { useState } from "react";

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

function Files() {
  const [search, setSearch] = useDebouncedState("", 200);
  const [page, setPage] = useState(1);

  const { data: products } = useFetch<Products>(
    `${
      process.env.NEXT_PUBLIC_NEXT_API as string
    }/getProducts?search=${search}&page=${page}`
  );

  const router = useRouter();

  const rows = products?.findProducts?.map((element) => (
    <Table.Tr key={element.id}>
      <Table.Td>{element.id}</Table.Td>
      <Table.Td>{element.deviceName}</Table.Td>
      <Table.Td>{element.indentifier}</Table.Td>
      <Table.Td>
        <Image alt="image" src={element.images[0]} h={50} />
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <>
      <Paper withBorder p="md" radius="md">
        <Flex justify={"space-between"}>
          <Title order={2} c={"brand"}>
            ข้อมูลสินค้า
          </Title>
          <TextInput
            onChange={(e) => {
              setSearch(e.currentTarget.value);
            }}
          />
          <Button
            color="brand"
            leftSection={<IconPlus size={14} />}
            onClick={() => router.push("./Files/createProduct")}
          >
            เพิ่มสินค้าใหม่
          </Button>
        </Flex>
        <Table stickyHeader stickyHeaderOffset={60} mt={"lg"}>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>id</Table.Th>
              <Table.Th>deviceName</Table.Th>
              <Table.Th>indentifier</Table.Th>
              <Table.Th>images</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
          <Table.Caption>
            <Center>
              <Pagination
                onChange={(e) => setPage(e)}
                total={products?.countFindInstallmentPayments ?? 0}
              />
            </Center>
          </Table.Caption>
        </Table>
      </Paper>
    </>
  );
}

export default Files;
