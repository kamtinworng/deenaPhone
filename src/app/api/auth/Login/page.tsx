"use client";
import {
  Paper,
  TextInput,
  PasswordInput,
  Button,
  Title,
  Flex,
  Image,
  Box,
  Alert,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconError404 } from "@tabler/icons-react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

function Page() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const router = useRouter();
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      username: "",
      password: "",
    },
    validate: {
      username: (value) =>
        value.length > 0 ? null : "กรุณากรอกข้อมูล username",
      password: (value) =>
        value.length > 0 ? null : "กรุณากรอกข้อมูล password",
    },
  });
  return (
    <Flex className="Flex-login">
      <Paper radius={0} p={30}>
        <Title order={2} ta="center" mt="md" mb={50}>
          Welcome back to Deena Phone System!
        </Title>
        <Alert
          variant="light"
          color="red"
          title="ไม่พบผู้ใช้งาน"
          icon={<IconError404 size={14} />}
          my={"md"}
          hidden={!error}
        >
          กรุณาตรวจสอบ username หรือ password
        </Alert>
        <form
          onSubmit={form.onSubmit(async (values) => {
            setLoading(!loading);
            const res = await signIn("credentials", {
              username: values.username,
              password: values.password,
              redirect: false,
            });

            if (res?.error) {
              setLoading(false);
              setError(true);
            } else {
              router.push("/CMS");
            }
          })}
        >
          <TextInput
            label="Username"
            placeholder="Your username"
            size="md"
            key={form.key("username")}
            {...form.getInputProps("username")}
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            mt="md"
            size="md"
            key={form.key("password")}
            {...form.getInputProps("password")}
          />
          <Button
            type="submit"
            fullWidth
            mt="xl"
            size="md"
            color="brand"
            loading={loading}
          >
            Login
          </Button>
        </form>
      </Paper>
      <Box className="Mobile-not-show">
        <Image
          fit="cover"
          alt="background image"
          h={"100vh"}
          src={"/image1.jpg"}
        />
      </Box>
    </Flex>
  );
}

export default Page;
