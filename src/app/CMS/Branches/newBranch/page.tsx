"use client";

import {
  Paper,
  Title,
  Text,
  TextInput,
  Stack,
  Divider,
  Group,
  rem,
  Flex,
  Button,
  UnstyledButton,
  Image,
} from "@mantine/core";
import { Dropzone, FileWithPath, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { hasLength, isNotEmpty, useForm } from "@mantine/form";
import {
  IconDeviceFloppy,
  IconPhoto,
  IconUpload,
  IconX,
} from "@tabler/icons-react";
import { useState } from "react";

function NewBranch() {
  const [files, setFiles] = useState<FileWithPath[]>([]);
  const [file, setFile] = useState("");

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      code: "",
      name: "",
      profileImage: "",
    },
    validate: {
      code: isNotEmpty(),
      name: hasLength({ min: 1, max: 50 }),
    },
  });

  const previews = files.map((file, index) => {
    const imageUrl = URL.createObjectURL(file);
    if (index !== 0) return;
    return (
      <Image
        key={index}
        src={imageUrl}
        onLoad={() => URL.revokeObjectURL(imageUrl)}
        alt="image"
      />
    );
  });

  const createBranch = (code: string, name: string) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const handleChange = (file: File | null) => {
      if (file === null) return;
      const reader = new FileReader();

      reader.onload = (event) => {
        if (typeof event.target?.result !== "string") return;

        const dataUri = event.target.result;
        const [, base64] = dataUri.split(",");
        setFile(base64);
      };
      reader.readAsDataURL(file);
    };

    handleChange(files[0]);

    const raw = JSON.stringify({
      code: code,
      name: name,
      profileImage: file,
    });

    console.log(process.env.NEXT_PUBLIC_NEXT_API);

    fetch(`${process.env.NEXT_PUBLIC_NEXT_API as string}/createBrand`, {
      method: "POST",
      headers: myHeaders,
      body: raw,
    })
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.error(error));
  };

  return (
    <>
      <Title c={"brand"}>Profile</Title>
      <Text>
        This information will be displayed publicly so be careful what you
        share.
      </Text>
      <Paper shadow="xs" radius="lg" withBorder p={"lg"} mt={"md"}>
        <form
          onSubmit={form.onSubmit((values) =>
            createBranch(values.code, values.name)
          )}
        >
          <Stack gap="md" align="stretch" justify="center">
            <TextInput
              label="Code brand"
              description="รหัสสำหรับอ้างอิงถึงสาขา"
              placeholder="กรุณากรอกโค้ดสำหรับสาขา ex. brandDeena01"
              key={form.key("code")}
              {...form.getInputProps("code")}
              withAsterisk
            />
            <TextInput
              label="Name brand"
              description="ชื่อที่บ่กบอกถึงสาขานั้น"
              placeholder="กรุณากรอกชื่อสาขา"
              key={form.key("name")}
              {...form.getInputProps("name")}
              withAsterisk
            />
            <Text>รูปภาพสาขา</Text>
            {files.length > 0 ? (
              previews
            ) : (
              <Dropzone
                onDrop={setFiles}
                onReject={(files) => console.log("rejected files", files)}
                maxSize={5 * 1024 ** 2}
                accept={IMAGE_MIME_TYPE}
              >
                <Group
                  justify="center"
                  gap="xl"
                  mih={220}
                  style={{ pointerEvents: "none" }}
                >
                  <Dropzone.Accept>
                    <IconUpload
                      style={{
                        width: rem(52),
                        height: rem(52),
                        color: "var(--mantine-color-blue-6)",
                      }}
                      stroke={1.5}
                    />
                  </Dropzone.Accept>
                  <Dropzone.Reject>
                    <IconX
                      style={{
                        width: rem(52),
                        height: rem(52),
                        color: "var(--mantine-color-red-6)",
                      }}
                      stroke={1.5}
                    />
                  </Dropzone.Reject>
                  <Dropzone.Idle>
                    <IconPhoto
                      style={{
                        width: rem(52),
                        height: rem(52),
                        color: "var(--mantine-color-dimmed)",
                      }}
                      stroke={1.5}
                    />
                  </Dropzone.Idle>

                  <div>
                    <Text size="xl" inline>
                      Drag images here or click to select files
                    </Text>
                    <Text size="sm" c="dimmed" inline mt={7}>
                      Attach as many files as you like, each file should not
                      exceed 5mb
                    </Text>
                  </div>
                </Group>
              </Dropzone>
            )}

            <Divider mt={"lg"} />
            <Flex justify={"end"}>
              <Flex gap="lg" align="stretch" justify="center" direction={"row"}>
                <UnstyledButton>Cancel</UnstyledButton>
                <Button
                  color={"brand"}
                  leftSection={<IconDeviceFloppy size={14} />}
                  type="submit"
                >
                  Save
                </Button>
              </Flex>
            </Flex>
          </Stack>
        </form>
      </Paper>
    </>
  );
}

export default NewBranch;
