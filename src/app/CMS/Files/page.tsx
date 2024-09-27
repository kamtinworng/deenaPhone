"use client";
import {
  Paper,
  Group,
  ThemeIcon,
  SimpleGrid,
  Text,
  Table,
  Pagination,
  Center,
  Flex,
  Title,
  TextInput,
} from "@mantine/core";
import { IconArrowUpRight, IconArrowDownRight } from "@tabler/icons-react";
import classes from "./StatsGridIcons.module.css";
import { useFetch } from "@mantine/hooks";

export interface Products {
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
  passwordIdLoad: string;
}

function Files() {
  const { data, loading, error, refetch, abort } = useFetch<Products[]>(
    `${process.env.NEXTAUTH_URL as string}/getProducts`
  );

  const datad = [
    { title: "Revenue", value: "$13,456", diff: 34 },
    { title: "Profit", value: "$4,145", diff: -13 },
    { title: "Coupons usage", value: "745", diff: 18 },
    { title: "Coupons usage", value: "745", diff: 18 },
  ];

  const stats = datad.map((stat) => {
    const DiffIcon = stat.diff > 0 ? IconArrowUpRight : IconArrowDownRight;
    return (
      <Paper withBorder p="md" radius="md" key={stat.title}>
        <Group justify="apart">
          <div>
            <Text
              c="dimmed"
              tt="uppercase"
              fw={700}
              fz="xs"
              className={classes.label}
            >
              {stat.title}
            </Text>
            <Text fw={700} fz="xl">
              {stat.value}
            </Text>
          </div>
          <ThemeIcon
            color="gray"
            variant="light"
            style={{
              color:
                stat.diff > 0
                  ? "var(--mantine-color-teal-6)"
                  : "var(--mantine-color-red-6)",
            }}
            size={38}
            radius="md"
          >
            <DiffIcon size="1.8rem" stroke={1.5} />
          </ThemeIcon>
        </Group>
        <Text c="dimmed" fz="sm" mt="md">
          <Text component="span" c={stat.diff > 0 ? "teal" : "red"} fw={700}>
            {stat.diff}%
          </Text>{" "}
          {stat.diff > 0 ? "increase" : "decrease"} compared to last month
        </Text>
      </Paper>
    );
  });

  const rows = data?.map((element) => (
    <Table.Tr key={element.id}>
      <Table.Td>{element.id}</Table.Td>
      <Table.Td>{element.deviceName}</Table.Td>
      <Table.Td>{element.indentifier}</Table.Td>
      <Table.Td>{element.images[0]}</Table.Td>
    </Table.Tr>
  ));

  return (
    <>
      <SimpleGrid cols={{ base: 1, sm: 4 }}>{stats}</SimpleGrid>;
      <Paper withBorder p="md" radius="md">
        <Flex justify={"space-between"}>
          <Title order={2} c={"brand"}>
            ข้อมูลสินค้า
          </Title>
          <TextInput />
        </Flex>
        <Table stickyHeader stickyHeaderOffset={60}>
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
              <Pagination total={10} />
            </Center>
          </Table.Caption>
        </Table>
      </Paper>
    </>
  );
}

export default Files;
