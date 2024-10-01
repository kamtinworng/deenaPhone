import { Image, Center, Loader, Stack, Title } from "@mantine/core";

export default function Loading() {
  return (
    <div className="center-screen">
      <Stack gap={"md"}>
        <Image
          radius="md"
          src="/undraw_loading.svg"
          alt="image loading"
          h={200}
        />
        <Title order={1}>Deena Phone</Title>
        <Center>
          <Loader color="brand" type="dots" size="xl" />
        </Center>
      </Stack>
    </div>
  );
}
