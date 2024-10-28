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
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { signIn } from "next-auth/react";

function Page() {
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
        <form
          onSubmit={form.onSubmit((values) => {
            signIn("credentials", {
              username: values.username,
              password: values.password,
              redirect: true,
              callbackUrl: "/CMS",
            });
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
          <Button type="submit" fullWidth mt="xl" size="md" color="brand">
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
