import { Center, Loader } from "@mantine/core";

export default function Loading() {
  return (
    <div className="center-screen">
      <Center>
        <Loader color="brand" type="dots" size="xl" />
      </Center>
    </div>
  );
}
