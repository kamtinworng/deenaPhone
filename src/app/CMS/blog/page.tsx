"use client";
import {
  Paper,
  Flex,
  Title,
  TextInput,
  Button,
  Table,
  Center,
  Pagination,
  Badge,
} from "@mantine/core";
import { useDebouncedState, useFetch } from "@mantine/hooks";
import { IconPlus } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export interface typeBlog {
  findBlogs: {
    id: string;
    title: string;
    detail: string;
    typeBlog: "news" | "promotion";
    image: string;
  }[];
  countfindBlogs: number;
}

function Blog() {
  const [search, setSearch] = useDebouncedState("", 200);
  const [page, setPage] = useState(1);

  const { data: blogs } = useFetch<typeBlog>(
    `${
      process.env.NEXT_PUBLIC_NEXT_API as string
    }/getBlogs?search=${search}&page=${page}`
  );

  const router = useRouter();

  const rows = blogs?.findBlogs?.map((element, index) => {
    return (
      <Table.Tr key={index}>
        <Table.Td>{element.id}</Table.Td>
        <Table.Td>{element.title}</Table.Td>
        <Table.Td>
          <Badge color={element.typeBlog === "news" ? "blue" : "brand"}>
            {element.typeBlog}
          </Badge>
        </Table.Td>
      </Table.Tr>
    );
  });

  return (
    <>
      ข่าวสาร อัพเดตจากทางร้าน
      <Paper withBorder p="md" radius="md">
        <Flex justify={"space-between"}>
          <Title order={2} c={"brand"}>
            ข้อมูลข่าวสาร
          </Title>
          <TextInput
            onChange={(e) => {
              setSearch(e.currentTarget.value);
            }}
          />
          <Button
            color="brand"
            leftSection={<IconPlus size={14} />}
            onClick={() => router.push("./blog/createNews")}
          >
            เพิ่มสินค้าใหม่
          </Button>
        </Flex>
        <Table stickyHeader stickyHeaderOffset={60} mt={"lg"}>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>id</Table.Th>
              <Table.Th>title</Table.Th>
              <Table.Th>type blog</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
          <Table.Caption>
            <Center>
              <Pagination
                onChange={(e) => setPage(e)}
                total={blogs?.countfindBlogs ?? 0}
              />
            </Center>
          </Table.Caption>
        </Table>
      </Paper>
    </>
  );
}

export default Blog;
