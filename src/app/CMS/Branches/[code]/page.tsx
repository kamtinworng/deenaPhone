"use client";
import { Divider, Skeleton, Stack } from "@mantine/core";
import { useFetch } from "@mantine/hooks";
// import { useRouter } from "next/navigation";
import { TYPE_BRANDS } from "../page";
import Header from "./components/header";
import Detail from "./components/Detail";
import SetBreadcrumbs, {
  TYPEBREADCRUMBS,
} from "../../../../../libs/breadcrumbs";

function PageBranch({ params }: { params: { code: string } }) {
  const { data: brand, loading: brandLoging } = useFetch<TYPE_BRANDS>(
    `${process.env.NEXT_PUBLIC_NEXT_API}/getBrand?code=${params.code}`
  );

  if (!brand) return;

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
        <Divider />
      </Stack>
      <Detail brand={brand} />
    </>
  );
}

export default PageBranch;
