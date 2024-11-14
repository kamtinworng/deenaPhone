"use client";
import { rem, Skeleton, Stack, Tabs } from "@mantine/core";
import { useFetch } from "@mantine/hooks";
// import { useRouter } from "next/navigation";
import { TYPE_BRANDS } from "../page";
import Header from "./components/header";
import Detail from "./components/Detail";
import SetBreadcrumbs, {
  TYPEBREADCRUMBS,
} from "../../../../../libs/breadcrumbs";
import { IconSettings, IconRobot } from "@tabler/icons-react";
import ChatBot from "./components/chatBot";

function PageBranch({ params }: { params: { code: string } }) {
  const {
    data: brand,
    loading: brandLoging,
    refetch: brandRefetch,
  } = useFetch<TYPE_BRANDS>(
    `${process.env.NEXT_PUBLIC_NEXT_API}/getBrand?code=${params.code}`
  );

  if (!brand) return;

  const iconStyle = { width: rem(14), height: rem(14) };
  if (brandLoging) {
    return (
      <>
        <Skeleton height={400} />
        <Skeleton height={20} mt={"sm"} width={"30%"} />
        <Skeleton height={20} mt={"sm"} width={"30%"} />
        <Skeleton height={400} mt={"sm"} />
      </>
    );
  }

  const breadcrumbs: TYPEBREADCRUMBS[] = [
    {
      title: "Branches",
      href: "./",
    },
    {
      title: brand.name,
      href: "",
    },
  ];
  return (
    <>
      <SetBreadcrumbs breadcrumbs={breadcrumbs} />
      <Stack gap="md" align="stretch" justify="center">
        <Header branch={brand} />
      </Stack>
      <Tabs defaultValue="general" my={"md"}>
        <Tabs.List>
          <Tabs.Tab
            value="general"
            leftSection={<IconSettings style={iconStyle} />}
          >
            General
          </Tabs.Tab>
          <Tabs.Tab
            value="messages"
            leftSection={<IconRobot style={iconStyle} />}
          >
            Chat Bot
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="general">
          <Detail brand={brand} />
        </Tabs.Panel>

        <Tabs.Panel value="messages">
          <ChatBot
            branchId={brand.id}
            brandRefetch={brandRefetch}
            brand={brand}
          />
        </Tabs.Panel>
      </Tabs>
    </>
  );
}

export default PageBranch;
