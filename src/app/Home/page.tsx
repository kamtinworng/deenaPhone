"use client";

import { Box, Button, Stack, TextInput } from "@mantine/core";
import Banner from "./components/carousel/page";
import NewsPromotions from "./components/NewsPromotions/page";
import Products from "./components/Products/page";
// import Dashboard from "./components/Dashboard/page";
import AboutUs from "./components/AboutUs/page";
import { useForm } from "@mantine/form";
import { useRouter } from "next/navigation";
import { notifications } from "@mantine/notifications";
// import FooterCentered from "./components/Footer/page";

function Page() {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: { code: "" },
    validate: {
      code: (value) =>
        value.length < 2 ? "Name must have at least 2 letters" : null,
    },
  });

  const router = useRouter();

  const onClick = async (code: string) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    // Await the fetch call

    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_NEXT_API as string
      }/getInstallmentPaymentByCode?code=${code}`,
      {
        method: "GET",
        headers: myHeaders,
      }
    );

    const result = await response.json();

    if (result.status === 200) {
      router.push(`./Home/${code}`);
    } else {
      notifications.show({
        title: "NOT FOUND! ❌",
        message: "ไม่พบรหัสดังกล่าว",
        color: "red",
      });
    }
  };
  return (
    <div>
      <Banner />
      <Box m={"md"} my={"lg"}>
        <form onSubmit={form.onSubmit((values) => onClick(values.code))}>
          <Stack gap="md" align="stretch" justify="center">
            <TextInput
              label="Code deenaphone"
              placeholder="ex. deenaXX"
              size="md"
              key={form.key("code")}
              {...form.getInputProps("code")}
            />
            <Button type="submit" bg={"brand"} size="compact-lg" fullWidth>
              ค้นหา
            </Button>
          </Stack>
        </form>
      </Box>
      <NewsPromotions />
      <Products />
      {/* <Dashboard /> */}
      <AboutUs />
      {/* <FooterCentered /> */}
    </div>
  );
}

export default Page;
