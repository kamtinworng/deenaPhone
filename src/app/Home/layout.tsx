"use client";

import {
  AppShell,
  Group,
  Burger,
  Image,
  TextInput,
  Button,
  Box,
} from "@mantine/core";
import { useDisclosure, useViewportSize } from "@mantine/hooks";
import { IconSearch } from "@tabler/icons-react";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [opened, { toggle }] = useDisclosure();
  const { width } = useViewportSize();
  return (
    <div>
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
          <Group h="100%" px="md">
            <Group
              justify={width < 1000 ? "center" : "space-between"}
              style={{ flex: 1 }}
            >
              <Group ml="xl" gap={"md"} visibleFrom="md">
                <Image src={"./logo.jpg"} alt="logo" h={50} />
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
                w={width < 1000 ? "100%" : "auto"}
              >
                <Box hidden={width > 1000}>
                  <Image src={"./logo.jpg"} alt="logo" h={50} />
                </Box>
                <TextInput
                  placeholder="Search"
                  radius={"md"}
                  leftSection={<IconSearch size={14} />}
                  w={width < 1000 ? "70%" : "auto"}
                />
                <Box hidden={width < 1000}>
                  <Button color="brand">สำหรับเจ้าหน้าที่</Button>
                </Box>
              </Group>
            </Group>
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="md"
              size="sm"
            />
          </Group>
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
          <Button variant="subtle" color="brand">
            สำหรับเจ้าหน้าที่
          </Button>
        </AppShell.Navbar>

        <AppShell.Main style={{ backgroundColor: "#f3f4f6" }}>
          {children}
        </AppShell.Main>
      </AppShell>
    </div>
  );
}
