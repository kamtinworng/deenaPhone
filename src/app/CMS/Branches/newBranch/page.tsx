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
import { useRouter } from "next/navigation";
import { useState } from "react";
import SetBreadcrumbs, {
  TYPEBREADCRUMBS,
} from "../../../../../libs/breadcrumbs";
import { notifications } from "@mantine/notifications";

function NewBranch() {
  const [files, setFiles] = useState<FileWithPath[]>([]);
  const router = useRouter();

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

  const createBranch = async (code: string, name: string) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    // File handling
    const handleChange = (file: File | null): Promise<string | null> => {
      return new Promise((resolve, reject) => {
        if (file === null) return resolve(null);
        const reader = new FileReader();

        reader.onload = (event) => {
          if (typeof event.target?.result !== "string") return resolve(null);

          const dataUri = event.target.result;
          const [, base64] = dataUri.split(",");
          resolve(base64);
        };

        reader.onerror = () => reject(new Error("Failed to read file"));
        reader.readAsDataURL(file);
      });
    };

    try {
      // Await the file read process
      const file = await handleChange(files[0]);

      // Prepare the request body
      const raw = JSON.stringify({
        code: code,
        name: name,
        profileImage: file,
      });

      // Await the fetch call
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_NEXT_API as string}/createBrand`,
        {
          method: "POST",
          headers: myHeaders,
          body: raw,
        }
      );

      const result = await response.json();

      if (result.status === "ok") {
        router.push(`./${result.createUser.code}`);
      } else {
        notifications.show({
          title: "Error system",
          message: "มีบ้างอย่างผิดพลาดกรุณาติดต่อผู้พัฒนาระบบ",
          color: "red",
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const breadcrumbs: TYPEBREADCRUMBS[] = [
    {
      title: "Branches",
      href: "./",
    },
    {
      title: "New branch",
      href: "",
    },
  ];

  return (
    <>
      <SetBreadcrumbs breadcrumbs={breadcrumbs} />
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
                <UnstyledButton onClick={() => router.back()}>
                  Cancel
                </UnstyledButton>
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
