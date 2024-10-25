"use client";

import {
  AppShell,
  Avatar,
  Burger,
  Divider,
  Flex,
  Group,
  Image,
  Menu,
  NavLink,
  rem,
  ThemeIcon,
  UnstyledButton,
  useComputedColorScheme,
  useMantineColorScheme,
  Text,
  useMantineTheme,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  Icon,
  IconBlockquote,
  // IconArrowLeft,
  IconBuildingStore,
  IconChevronDown,
  IconChevronRight,
  // IconDashboard,
  IconDeviceMobile,
  IconFolder,
  IconHeart,
  IconHome,
  IconLogout,
  IconMessage,
  IconMoon,
  IconPlayerPause,
  IconProps,
  IconSettings,
  IconShoppingCart,
  IconStar,
  IconSun,
  IconSwitchHorizontal,
  IconTrash,
} from "@tabler/icons-react";
import { signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import {
  ForwardRefExoticComponent,
  RefAttributes,
  useEffect,
  useState,
} from "react";
import classes from "./HeaderTabs.module.css";
import cx from "clsx";

export default function CMSLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const path = pathname.split("/")[2];

  const links: {
    label: string;
    icon: ForwardRefExoticComponent<IconProps & RefAttributes<Icon>>;
    link: string;
    code: string;
  }[] = [
    {
      icon: IconHome,
      label: "หน้าแรก",
      link: "/CMS",
      code: "CMS",
    },
    {
      icon: IconBuildingStore,
      label: "สาขาร้าน",
      link: "/CMS/Branches",
      code: "Branches",
    },
    {
      icon: IconShoppingCart,
      label: "ระบบขายสินค้า",
      link: "/CMS/SellSystem",
      code: "SellSystem",
    },
    {
      icon: IconBlockquote,
      label: "ข่าวสาร",
      link: "/CMS/blog",
      code: "blog",
    },
  ];

  const { setColorScheme } = useMantineColorScheme();
  const [opened, { toggle }] = useDisclosure();
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  // Client-side state for color scheme
  const [clientColorScheme, setClientColorScheme] = useState<"light" | "dark">(
    "light"
  );

  const { data: session } = useSession();

  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });
  const theme = useMantineTheme();
  useEffect(() => {
    setClientColorScheme(computedColorScheme);
  }, [computedColorScheme]);

  const navLink = (props: {
    label: string;
    href: string;
    icon: ForwardRefExoticComponent<IconProps & RefAttributes<Icon>>;
    active: boolean;
  }) => {
    return (
      <NavLink
        label={props.label}
        variant={props.active ? "filled" : "light"}
        className={props.active ? classes.navlinknothover : classes.navlink}
        color={props.active ? "white" : "brand"}
        href={`${props.href}`}
        active={props.active}
        c={props.active ? "brand" : "white"}
        leftSection={
          <ThemeIcon
            color={props.active ? "brand" : "white"}
            variant={props.active ? "light" : "transparent"}
            radius="xs"
          >
            <props.icon size="1rem" stroke={1.5} />
          </ThemeIcon>
        }
      />
    );
  };

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 250,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Flex justify={"space-between"} align={"center"} h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Flex direction={"row"} align={"center"} gap={"md"}>
            <Image alt="logo" src={"/logo.jpg"} height={40} />
            <Title order={3} c={"brand"}>
              DEENAPHONE
            </Title>
          </Flex>
          <Menu
            width={260}
            position="bottom-end"
            transitionProps={{ transition: "pop-top-right" }}
            onClose={() => setUserMenuOpened(false)}
            onOpen={() => setUserMenuOpened(true)}
            withinPortal
          >
            <Menu.Target>
              <UnstyledButton
                className={cx(classes.user, {
                  [classes.userActive]: userMenuOpened,
                })}
              >
                <Group gap={7}>
                  <Avatar
                    src={session?.user.image}
                    alt={session?.user.username}
                    radius="xl"
                    size={20}
                  />
                  <Text fw={500} size="sm" lh={1} mr={3}>
                    {session?.user.username}
                  </Text>
                  <IconChevronDown
                    style={{ width: rem(12), height: rem(12) }}
                    stroke={1.5}
                  />
                </Group>
              </UnstyledButton>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item
                leftSection={
                  <IconHeart
                    style={{ width: rem(16), height: rem(16) }}
                    color={theme.colors.red[6]}
                    stroke={1.5}
                  />
                }
              >
                Liked posts
              </Menu.Item>
              <Menu.Item
                leftSection={
                  <IconStar
                    style={{ width: rem(16), height: rem(16) }}
                    color={theme.colors.yellow[6]}
                    stroke={1.5}
                  />
                }
              >
                Saved posts
              </Menu.Item>
              <Menu.Item
                leftSection={
                  <IconMessage
                    style={{ width: rem(16), height: rem(16) }}
                    color={theme.colors.blue[6]}
                    stroke={1.5}
                  />
                }
              >
                Your comments
              </Menu.Item>

              <Menu.Label>Settings</Menu.Label>
              <Menu.Item
                leftSection={
                  <IconSettings
                    style={{ width: rem(16), height: rem(16) }}
                    stroke={1.5}
                  />
                }
              >
                Account settings
              </Menu.Item>
              <Menu.Item
                leftSection={
                  <IconSwitchHorizontal
                    style={{ width: rem(16), height: rem(16) }}
                    stroke={1.5}
                  />
                }
              >
                Change account
              </Menu.Item>
              <Menu.Item
                leftSection={
                  <IconLogout
                    style={{ width: rem(16), height: rem(16) }}
                    stroke={1.5}
                  />
                }
              >
                Logout
              </Menu.Item>

              <Menu.Divider />

              <Menu.Label>Danger zone</Menu.Label>
              <Menu.Item
                leftSection={
                  <IconPlayerPause
                    style={{ width: rem(16), height: rem(16) }}
                    stroke={1.5}
                  />
                }
              >
                Pause subscription
              </Menu.Item>
              <Menu.Item
                color="red"
                leftSection={
                  <IconTrash
                    style={{ width: rem(16), height: rem(16) }}
                    stroke={1.5}
                  />
                }
              >
                Delete account
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Flex>
      </AppShell.Header>
      <AppShell.Navbar bg={"brand"}>
        <Divider mt={0} my="md" />
        <Flex direction="column" h="100%">
          {links.map((link, index) => {
            const HomeActive = !path;
            return navLink({
              href: link.link,
              icon: link.icon,
              label: link.label,
              active: HomeActive
                ? index === 0
                  ? true
                  : false
                : link.code === path,
            });
          })}

          <NavLink
            label="การจัดการข้อมูล"
            color="white"
            active={false}
            variant={"light"}
            className={classes.navlink}
            c={"white"}
            leftSection={
              <ThemeIcon
                color="white"
                variant={false ? "light" : "transparent"}
                radius="xs"
              >
                <IconFolder size="1rem" stroke={1.5} />
              </ThemeIcon>
            }
          >
            <NavLink
              variant={"light"}
              className={classes.navlink}
              c={"white"}
              leftSection={
                <ThemeIcon
                  color="white"
                  variant={false ? "light" : "transparent"}
                  radius="xs"
                >
                  <IconDeviceMobile size="1rem" stroke={1.5} />
                </ThemeIcon>
              }
              href="/CMS/Files"
              label="ข้อมูลสินค้า"
            />
            <NavLink
              variant={"light"}
              className={classes.navlink}
              c={"white"}
              leftSection={
                <ThemeIcon
                  color="white"
                  variant={false ? "light" : "transparent"}
                  radius="xs"
                >
                  <IconBuildingStore size="1rem" stroke={1.5} />
                </ThemeIcon>
              }
              href="/CMS/InstallmentPayments"
              label="ข้อมูลการขายทั้งหมด"
            />
          </NavLink>
        </Flex>
        <Divider mb={0} my="md" />
        <Flex direction="column" align={"flex-end"}>
          {/* <NavLink
            label="ปิดแทบด้านข้าง"
            onClick={toggle}
            leftSection={
              <ThemeIcon color="brand" variant="light" radius="xs">
                <IconArrowLeft size="1rem" stroke={1.5} />
              </ThemeIcon>
            }
          /> */}
          <NavLink
            onClick={() =>
              setColorScheme(clientColorScheme === "light" ? "dark" : "light")
            }
            variant={"light"}
            className={classes.navlink}
            c={"white"}
            label="Theme"
            leftSection={
              <ThemeIcon color={"white"} variant="transparent" radius="xs">
                {clientColorScheme === "light" ? (
                  <IconMoon size="1rem" stroke={1.5} />
                ) : (
                  <IconSun size="1rem" stroke={1.5} />
                )}
              </ThemeIcon>
            }
          />
          <NavLink
            label="Logout"
            variant={"light"}
            className={classes.navlink}
            c={"white"}
            onClick={() =>
              signOut({
                redirect: true,
                callbackUrl: "/",
              })
            }
            leftSection={
              <ThemeIcon color="red" variant="filled" radius="xs">
                <IconLogout size="1rem" stroke={1.5} />
              </ThemeIcon>
            }
            rightSection={
              <IconChevronRight
                style={{ width: rem(14), height: rem(14) }}
                stroke={1.5}
                color="white"
              />
            }
          />
        </Flex>
      </AppShell.Navbar>
      <AppShell.Main
        bg={
          clientColorScheme === "light" ? `var(--mantine-color-gray-1)` : "dark"
        }
      >
        {children}
      </AppShell.Main>
    </AppShell>
  );
}
