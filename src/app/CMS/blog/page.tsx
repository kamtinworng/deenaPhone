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
  Text
} from "@mantine/core";
import { useDebouncedState, useFetch } from "@mantine/hooks";
import { IconPlus } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { GetBlogs } from "./loader";
import { notifications } from "@mantine/notifications";

export interface typeBlog {
  findBlogs: {
    id: string;
    title: string;
    detail: string;
    typeBlog: "news" | "promotion";
    image: string;
  }[];
  countPagination: number;
}

function Blog() {
  const [search, setSearch] = useDebouncedState("", 200);
  const [page, setPage] = useState(1);

  const [blogs, setBlogs] = useState<typeBlog | null>();

  useEffect(() => {
    const fetchData = async () => {
      const res = await GetBlogs({ page: page, search: search })
      if (res.status !== 200) {
        notifications.show({
          message: res.message,
          color: 'red'
        })
      }
      setBlogs(res.data)
    }
    fetchData()
  }, [])

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
              {rows ?
                <Pagination
                  onChange={(e) => setPage(e)}
                  total={blogs?.countPagination ?? 0}
                />
                : <Text>ไม่มีรายการข่าวสาร</Text>
              }
            </Center>
          </Table.Caption>
        </Table>
      </Paper>
    </>
  );
}

export default Blog;
