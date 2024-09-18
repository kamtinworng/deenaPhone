"use client";
import {
  AppShell,
  Group,
  Burger,
  TextInput,
  ActionIcon,
  rem,
  Button,
  Title,
  Flex,
  Image,
  Container,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconSearch,
  IconArrowRight,
  IconBrandInstagram,
  IconBrandTwitter,
  IconBrandYoutube,
} from "@tabler/icons-react";
import { useState } from "react";
import Mobile from "../../../libs/mobile";
import classes from "./FooterSocial.module.css";
// import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [opened, { toggle }] = useDisclosure();
  const [page, setPage] = useState(0);
  // const router = useRouter();

  const links = [
    { link: "/Home", label: "หน้าแรก" },
    { link: "/community", label: "ข่าวสารและโปรโมชั่น" },
    { link: "/Search", label: "สินค้า" },
    { link: "/Search", label: "รีวิวจากลูกค้า" },
    { link: "/learn", label: "เกี่ยวกับเรา" },
    { link: "/learn", label: "ติดต่อ" },
  ];
  return (
    <AppShell
      header={Mobile() ? { height: 50 } : { height: 100 }}
      navbar={{
        width: 300,
        breakpoint: "md",
        collapsed: { desktop: true, mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Flex direction={"column"}>
          <Group h="80%" px="md" bg={"brand"} p={"sm"}>
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="sm"
              size="sm"
            />
            <Group
              grow
              justify="space-between"
              align="center"
              style={{ flex: 1 }}
            >
              <Title order={Mobile() ? 4 : 2} c={"white"}>
                Deena Phone
              </Title>
              <TextInput
                radius="lg"
                leftSection={<IconSearch size={20} />}
                rightSection={
                  <ActionIcon radius="xl" color={"brand"} variant="filled">
                    <IconArrowRight
                      style={{ width: rem(18), height: rem(18) }}
                      stroke={1.5}
                    />
                  </ActionIcon>
                }
                placeholder="Ex: deena00xx"
              ></TextInput>
            </Group>
          </Group>
          <Group h="100%" pt={1} justify="center" align="center">
            <Flex gap={3} visibleFrom="sm" justify={"center"}>
              {links.map((link, index) => {
                return (
                  <Button
                    color="brand"
                    variant={page === index ? "light" : "subtle"}
                    key={index}
                    onClick={() => setPage(index)}
                  >
                    {link.label}
                  </Button>
                );
              })}
              <Button color="brand" variant="subtle" onClick={() => signIn()}>
                สำหรับเจ้าหน้าที่
              </Button>
            </Flex>
          </Group>
        </Flex>
      </AppShell.Header>

      <AppShell.Navbar py="md" px={4}>
        {links.map((link, index) => {
          return (
            <Button
              color="brand"
              variant={page === index ? "light" : "transparent"}
              key={index}
              onClick={() => setPage(index)}
            >
              {link.label}
            </Button>
          );
        })}
      </AppShell.Navbar>

      <AppShell.Main>
        <div>
          <Container size={"80%"}>{children}</Container>
        </div>
      </AppShell.Main>

      <div className={classes.footer}>
        <Container className={classes.inner}>
          <Image src={"/logo.jpg"} alt="logo" h={50} />
          <Group
            gap={0}
            className={classes.links}
            justify="flex-end"
            wrap="nowrap"
          >
            <ActionIcon size="lg" color="gray" variant="subtle">
              <IconBrandTwitter
                style={{ width: rem(18), height: rem(18) }}
                stroke={1.5}
              />
            </ActionIcon>
            <ActionIcon size="lg" color="gray" variant="subtle">
              <IconBrandYoutube
                style={{ width: rem(18), height: rem(18) }}
                stroke={1.5}
              />
            </ActionIcon>
            <ActionIcon size="lg" color="gray" variant="subtle">
              <IconBrandInstagram
                style={{ width: rem(18), height: rem(18) }}
                stroke={1.5}
              />
            </ActionIcon>
          </Group>
        </Container>
      </div>
    </AppShell>
  );
}
