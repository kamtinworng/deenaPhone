"use client";

import { Box, Button, Flex, Image, Title, Text } from "@mantine/core";
import { TYPE_BRANDS } from "../../page";
import { IconMessage, IconPhone } from "@tabler/icons-react";

function Header(props: { branch: TYPE_BRANDS }) {
  return (
    <Box>
      <Image
        alt="image branch"
        src={props.branch.profileImage}
        height={400}
        radius={"md"}
      ></Image>
      <Flex
        gap="md"
        justify="space-between"
        align="center"
        direction={"row"}
        wrap="nowrap"
      >
        <Flex direction={"column"}>
          <Title mt={"md"}>{props.branch.name}</Title>
          <Text c={"dimmed"}># {props.branch.code}</Text>
        </Flex>
        <Flex justify="flex-start" gap="md">
          <Button color="brand" leftSection={<IconMessage size={14} />}>
            Message
          </Button>
          <Button color="blue" leftSection={<IconPhone size={14} />}>
            Call
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
}
export default Header;
