"use client";
import {
  Anchor,
  Badge,
  Box,
  Button,
  Card,
  Divider,
  Flex,
  SimpleGrid,
  Text,
  Grid,
  Avatar,
  Group,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { TYPE_BRANDS } from "../../page";
import { modals } from "@mantine/modals";
import CreateChatBot from "./createChatBot";
import { useState } from "react";
import EditChatBot from "./editChatBot";

function ChatBot(props: {
  branchId: string;
  brandRefetch: () => void;
  brand: TYPE_BRANDS;
}) {
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const [defaultValue, setDefaultValue] = useState<{
    id: string;
    title: string;
    question: string;
    answer: string;
    image: string | null;
    keyword: string[];
    buttonLink: string[];
  } | null>(null);

  const openModal = (chatBotId: string, title: string) =>
    modals.openConfirmModal({
      title: `Please confirm to delete ${title}`,
      children: (
        <Text size="sm">
          This action is so important that you are required to confirm it with a
          modal. Please click one of these buttons to proceed.
        </Text>
      ),
      labels: { confirm: "DELETE", cancel: "Cancel" },
      confirmProps: { color: "red" },
      centered: true,
      onConfirm: async () => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_NEXT_API as string
          }/deleteChatBot?chatBotId=${chatBotId}`,
          {
            method: "DELETE",
            headers: myHeaders,
          }
        );

        const result = await response.json();

        if (result.status === "ok") {
          notifications.show({
            title: "success system",
            message: "ลบ chat bot สำเร็จ",
            color: "green",
          });
          props.brandRefetch();
        } else {
          // setLoading(false);
          notifications.show({
            title: "Error system",
            message: "มีบ้างอย่างผิดพลาดกรุณาติดต่อผู้พัฒนาระบบ",
            color: "red",
          });
        }
      },
    });

  return (
    <>
      <CreateChatBot
        opened={open}
        close={() => setOpen(false)}
        branchId={props.branchId}
        brandRefetch={() => props.brandRefetch()}
      />
      <EditChatBot
        opened={openEdit}
        close={() => setOpenEdit(false)}
        branchId={props.branchId}
        brandRefetch={() => props.brandRefetch()}
        defaultValue={defaultValue}
      />
      <Box p={"md"}>
        <Flex justify={"space-between"}>
          <Text>ข้อความอัตโนมัติ</Text>
          <Anchor onClick={() => setOpen(true)}>+ เพิ่มข้อควมอัตโนมัติ</Anchor>
        </Flex>
        <SimpleGrid
          cols={{ lg: 3, md: 2, sm: 1 }}
          spacing="md"
          verticalSpacing="md"
          mt={"md"}
        >
          {props.brand.chatBot.map((chat) => {
            return (
              <Card p={"md"} shadow="md" key={chat.id}>
                <Flex gap={"md"} align={"center"} justify={"space-between"}>
                  <Group justify="flex-start">
                    <Avatar src={chat.image} alt="it's me" />
                    <Flex direction={"column"}>
                      {chat.question}
                      <Text c={"dimmed"} size="sm">
                        {chat.id}
                      </Text>
                    </Flex>
                  </Group>
                  <Badge variant="light" color="brand">
                    {chat.title}
                  </Badge>
                </Flex>
                <Divider my="sm" />
                <Text size="md" lineClamp={2}>
                  {chat.answer}
                </Text>
                <Grid grow>
                  <Grid.Col span={8}>
                    <Button
                      fullWidth
                      mt={"md"}
                      onClick={() => {
                        setOpenEdit(true);
                        setDefaultValue({
                          id: chat.id,
                          title: chat.title,
                          answer: chat.answer,
                          buttonLink: chat.buttonLink,
                          image: chat.image,
                          keyword: chat.keyword,
                          question: chat.question,
                        });
                      }}
                    >
                      ดำเนินการ
                    </Button>
                  </Grid.Col>
                  <Grid.Col span={"auto"}>
                    <Button
                      fullWidth
                      mt={"md"}
                      color="brand"
                      onClick={() => openModal(chat.id, chat.title)}
                    >
                      ลบ
                    </Button>
                  </Grid.Col>
                </Grid>
              </Card>
            );
          })}
        </SimpleGrid>
      </Box>
    </>
  );
}

export default ChatBot;
