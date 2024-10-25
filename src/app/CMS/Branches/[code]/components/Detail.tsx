import {
  Card,
  Container,
  Title,
  Text,
  Divider,
  Stack,
  Flex,
  TextInput,
  Button,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { TYPE_BRANDS } from "../../page";

function Detail(props: { brand: TYPE_BRANDS }) {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      branchName: props.brand?.name,
    },
  });
  return (
    <>
      <Container size={"lg"} mt={"lg"}>
        <Card bg={"white"} radius={"lg"} shadow="xs" p={"lg"}>
          <Stack gap="md" align="stretch" justify="center">
            <Flex direction={"column"} justify="flex-start">
              <Title order={3}>รายละเอียดของสาขา</Title>
              <Text c={"dimmed"}>detail branch</Text>
            </Flex>
            <Divider />
          </Stack>
          <form onSubmit={form.onSubmit((values) => console.log(values))}>
            <TextInput
              mt={"lg"}
              label="branch name"
              key={form.key("branchName")}
              {...form.getInputProps("branchName")}
              size="lg"
            />
            <Flex justify="end" align="center" mt={"md"}>
              <Button color="brand" type="submit">
                Submit
              </Button>
            </Flex>
          </form>
        </Card>
      </Container>
    </>
  );
}

export default Detail;
