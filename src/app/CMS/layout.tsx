"use client";

import {
  AppShell,
  Avatar,
  Button,
  Divider,
  Flex,
  NavLink,
  rem,
  Text,
  ThemeIcon,
  useComputedColorScheme,
  useMantineColorScheme,
} from "@mantine/core";
import {
  Icon,
  IconBuildingStore,
  IconChevronRight,
  IconDashboard,
  IconDeviceMobile,
  IconFolder,
  IconHome,
  IconLogout,
  IconMoon,
  IconProps,
  IconShoppingCart,
  IconSun,
} from "@tabler/icons-react";
import { signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import {
  ForwardRefExoticComponent,
  RefAttributes,
  useEffect,
  useState,
} from "react";

export default function CMSLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const path = pathname.split("/")[2];

  console.log(path);

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
      icon: IconDashboard,
      label: "ยอดขายรายวันเดือนปี",
      link: "/CMS/Dashboard",
      code: "Dashboard",
    },
  ];

  // const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  // const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);
  const { setColorScheme } = useMantineColorScheme();

  // Client-side state for color scheme
  const [clientColorScheme, setClientColorScheme] = useState<"light" | "dark">(
    "light"
  );

  const { data: session } = useSession();

  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });

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
        variant="light"
        color="brand"
        href={`${props.href}`}
        active={props.active}
        leftSection={
          <ThemeIcon
            color="brand"
            variant={props.active ? "filled" : "light"}
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
      navbar={{
        width: 250,
        breakpoint: "sm",
        // collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
      }}
      padding="md"
    >
      <AppShell.Navbar>
        <Button
          color="brand"
          variant="subtle"
          justify="space-between"
          leftSection={
            <Avatar
              name={session?.user?.name ?? ""}
              color="initials"
              src={session?.user?.image}
            />
          }
          rightSection={
            <IconChevronRight
              style={{ width: rem(14), height: rem(14) }}
              stroke={1.5}
              color="#000"
            />
          }
          h="10%"
        >
          <Flex direction="column" justify="start" align="start">
            <Text
              size="sm"
              fw={500}
              c={clientColorScheme === "light" ? "#000" : "brand"}
            >
              {session?.user?.name}
            </Text>
            <Text size="xs" c="dimmed">
              {session?.user?.email}
            </Text>
          </Flex>
        </Button>
        <Divider mt={0} my="md" />
        <Flex direction="column" h="100%" mt="md">
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
            variant="light"
            color="brand"
            active={false}
            leftSection={
              <ThemeIcon
                color="brand"
                variant={false ? "filled" : "light"}
                radius="xs"
              >
                <IconFolder size="1rem" stroke={1.5} />
              </ThemeIcon>
            }
          >
            <NavLink
              leftSection={
                <ThemeIcon
                  color="brand"
                  variant={false ? "filled" : "light"}
                  radius="xs"
                >
                  <IconDeviceMobile size="1rem" stroke={1.5} />
                </ThemeIcon>
              }
              href="/CMS/Files"
              label="ข้อมูลสินค้า"
            />
            <NavLink
              leftSection={
                <ThemeIcon
                  color="brand"
                  variant={false ? "filled" : "light"}
                  radius="xs"
                >
                  <IconBuildingStore size="1rem" stroke={1.5} />
                </ThemeIcon>
              }
              href="#required-for-focus"
              label="ข้อมูลการขายทั้งหมด"
            />
          </NavLink>
        </Flex>
        <Divider mb={0} my="md" />
        <Flex direction="column" align={"flex-end"}>
          <NavLink
            onClick={() =>
              setColorScheme(clientColorScheme === "light" ? "dark" : "light")
            }
            label="Theme"
            leftSection={
              <ThemeIcon
                color={clientColorScheme === "light" ? "dark" : "white"}
                variant="light"
                radius="xs"
              >
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
            onClick={() =>
              signOut({
                redirect: true,
                callbackUrl: "/",
              })
            }
            leftSection={
              <ThemeIcon color="red" variant="light" radius="xs">
                <IconLogout size="1rem" stroke={1.5} />
              </ThemeIcon>
            }
            rightSection={
              <IconChevronRight
                style={{ width: rem(14), height: rem(14) }}
                stroke={1.5}
                color="#000"
              />
            }
          />
        </Flex>
      </AppShell.Navbar>
      <AppShell.Main bg={"#f3f4f6"}>{children}</AppShell.Main>
    </AppShell>
  );
}
