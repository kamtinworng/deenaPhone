"use client";
import { Anchor, Breadcrumbs } from "@mantine/core";

export interface TYPEBREADCRUMBS {
  title: string;
  href: string;
}

function SetBreadcrumbs(props: { breadcrumbs: TYPEBREADCRUMBS[] }) {
  const items = props.breadcrumbs.map((item, index) => (
    <Anchor href={item.href} key={index}>
      {item.title}
    </Anchor>
  ));

  return (
    <>
      <Breadcrumbs mb={"lg"}>{items}</Breadcrumbs>
    </>
  );
}

export default SetBreadcrumbs;
