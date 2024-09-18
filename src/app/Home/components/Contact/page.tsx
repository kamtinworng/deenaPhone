"use client";

import { Box, Flex, Group, Stack, Text, Title } from "@mantine/core";
import { IconAt, IconMapPin, IconPhone, IconSun } from "@tabler/icons-react";
interface ContactIconProps
  extends Omit<React.ComponentPropsWithoutRef<"div">, "title"> {
  icon: typeof IconSun;
  title: React.ReactNode;
  description: React.ReactNode;
}

function Contact() {
  const MOCKDATA = [
    { title: "Email", description: "hello@ex.dev", icon: IconAt },
    { title: "Phone", description: "098 919 1324", icon: IconPhone },
    {
      title: "Address",
      description:
        "1117 ม.4 ถ.เพชรเกษม ต.ควนลัง อ.หาดใหญ่ จ.สงขลา เทศบาลนครหาดใหญ่ 90110",
      icon: IconMapPin,
    },
    { title: "Working hours", description: "8 a.m. – 12 p.m.", icon: IconSun },
  ];

  function ContactIcon({
    icon: Icon,
    title,
    description,
    ...others
  }: ContactIconProps) {
    return (
      <div {...others}>
        <Box mr="md">
          <Icon size={20} />
        </Box>

        <div>
          <Text size="md">{title}</Text>
          <Text c={"brand"}>{description}</Text>
        </div>
      </div>
    );
  }

  const items = MOCKDATA.map((item, index) => (
    <ContactIcon key={index} {...item} />
  ));

  return (
    <div>
      <Flex justify={"center"} gap={"xl"}>
        <Stack>
          <Title>Contact</Title>
          us Leave your email and we will get back to you within 24 hours
          {items}
        </Stack>
        <Group>
          <iframe
            src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fprofile.php%3Fid%3D100086694325778&tabs=timeline&width=1000&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId"
            width="500"
            height="500"
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          ></iframe>
        </Group>
      </Flex>
    </div>
  );
}

export default Contact;
