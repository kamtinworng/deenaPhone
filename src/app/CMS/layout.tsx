"use client";
import {
  AppShell,
  Group,
  Image,
  Code,
  Divider,
  Title,
  Button,
  ActionIcon,
  ScrollArea,
} from "@mantine/core";
// import { useDisclosure } from "@mantine/hooks";
import {
  Icon,
  IconDashboard,
  IconFolder,
  IconHome,
  IconProps,
  IconShoppingCart,
} from "@tabler/icons-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";
export default function CMSLayout({ children }: { children: React.ReactNode }) {
  //   const [opened, { toggle }] = useDisclosure();

  const links: {
    label: string;
    icon: ForwardRefExoticComponent<IconProps & RefAttributes<Icon>>;
    link: string;
  }[] = [
    {
      icon: IconHome,
      label: "หน้าแรก",
      link: "./CMS",
    },
    {
      icon: IconShoppingCart,
      label: "ระบบขายสินค้า",
      link: "./CMS",
    },
    {
      icon: IconDashboard,
      label: "ยอดขายรายวันเดือนปี",
      link: "./CMS",
    },
    {
      icon: IconFolder,
      label: "การจัดการข้อมูล",
      link: "./CMS",
    },
  ];

  return (
    <AppShell
      navbar={{ width: 300, breakpoint: "sm" }}
      //   navbar={{ width: 300, breakpoint: "sm", collapsed: { mobile: !opened } }}
      padding="md"
    >
      {/* <AppShell.Header>
        <Group h="100%" px="md">
        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        </Group>
        </AppShell.Header> */}
      <AppShell.Navbar>
        <Group justify="space-between" px={"md"} py={"sm"}>
          <Group justify="start">
            <Image alt="logo" src={"/logo.jpg"} h={50} />
            <Title order={4} c={"brand"}>
              Deena Phone
            </Title>
          </Group>
          <Code fw={700}>v0.0.1</Code>
        </Group>
        <Divider />
        <AppShell.Section grow my="md" px={"md"} component={ScrollArea}>
          <Group py={"sm"} gap={0}>
            {links.map((link, index) => (
              <Button
                variant="subtle"
                justify="start"
                size="md"
                leftSection={
                  <ActionIcon
                    variant="light"
                    color="brand"
                    aria-label="Settings"
                  >
                    <link.icon
                      style={{ width: "70%", height: "70%" }}
                      stroke={1.5}
                    />
                  </ActionIcon>
                }
                color="brand"
                key={index}
                fullWidth
              >
                {link.label}
              </Button>
            ))}
          </Group>
        </AppShell.Section>
        <AppShell.Section>
          <Divider />
          Navbar footer – always at the bottom
        </AppShell.Section>
      </AppShell.Navbar>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
