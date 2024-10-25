"use client";

import {
  AppShell,
  Group,
  Burger,
  Image,
  Button,
  Box,
  Flex,
  Text,
} from "@mantine/core";
import { useDisclosure, useViewportSize } from "@mantine/hooks";
import { useRouter } from "next/navigation";
import Mobile from "../../../libs/mobile";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const [opened, { toggle }] = useDisclosure();
  const { width } = useViewportSize();
  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "md",
        collapsed: { desktop: true, mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Flex w={"100vw"} align={"center"} h="100%" px="md">
          <Group>
            <Image src={"./logo.jpg"} alt="logo" h={50} />
            <Text hidden={!Mobile()}>DEENAPHONE</Text>
          </Group>
          <Flex
            justify={Mobile() ? "flex-start" : "space-between"}
            style={{ flex: 1 }}
          >
            <Group ml="xl" gap={"md"} visibleFrom="md">
              <Button variant="subtle" color="brand">
                Home
              </Button>
              <Button variant="subtle" color="brand">
                Blog
              </Button>
              <Button variant="subtle" color="brand">
                Contacts
              </Button>
              <Button variant="subtle" color="brand">
                Support
              </Button>
            </Group>
            <Group
              justify="center"
              align="center"
              w={Mobile() ? "100%" : "auto"}
            >
              {/* <Box hidden={Mobile()}>
                <TextInput
                  placeholder="Search"
                  radius={"md"}
                  leftSection={<IconSearch size={14} />}
                  w={width < 1000 ? "70%" : "auto"}
                />
              </Box> */}
              <Box hidden={width < 1000}>
                <Button
                  color="brand"
                  onClick={() => router.push("/api/auth/Login")}
                >
                  สำหรับเจ้าหน้าที่
                </Button>
              </Box>
            </Group>
          </Flex>
          <Burger opened={opened} onClick={toggle} hiddenFrom="md" size="sm" />
        </Flex>
      </AppShell.Header>

      <AppShell.Navbar py="md" px={4}>
        <Button variant="subtle" color="brand">
          Home
        </Button>
        <Button variant="subtle" color="brand">
          Blog
        </Button>
        <Button variant="subtle" color="brand">
          Contacts
        </Button>
        <Button variant="subtle" color="brand">
          Support
        </Button>
        <Button
          variant="subtle"
          color="brand"
          onClick={() => router.push("/api/auth/Login")}
        >
          สำหรับเจ้าหน้าที่
        </Button>
      </AppShell.Navbar>
      <AppShell.Main style={{ backgroundColor: "#f3f4f6" }} p={0}>
        {children}
      </AppShell.Main>
    </AppShell>
  );
}
