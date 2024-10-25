"use client";
import {
  Group,
  Paper,
  rem,
  Select,
  SimpleGrid,
  Stack,
  TextInput,
  Text,
  Button,
  Flex,
  Image,
  Textarea,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { Dropzone, FileWithPath, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { IconUpload, IconX, IconPhoto } from "@tabler/icons-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { notifications } from "@mantine/notifications";

interface INPUTBLOG {
  typeBlog: string;
  blogTitle: string;
  blogDetail: string;
}

function CreateProduct() {
  const [files, setFiles] = useState<FileWithPath[]>([]);
  const router = useRouter();

  const previews = files.map((file, index) => {
    const imageUrl = URL.createObjectURL(file);
    return (
      <Image
        key={index}
        src={imageUrl}
        onLoad={() => URL.revokeObjectURL(imageUrl)}
        alt="previewImage"
      />
    );
  });
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      typeBlog: "",
      blogTitle: "",
      blogDetail: "",
    },
    validate: {
      typeBlog: (value) => (!value ? "กรุณาเลือกประเภทของข่าวสาร" : null),
      blogTitle: (value) => (!value ? "กรุณากรอกหัวเรื่องข่าวสาร" : null),
      blogDetail: (value) => (!value ? "กรุณากรอกรายละเอียดข่าวสาร" : null),
    },
  });

  const createProduct = async (form: INPUTBLOG) => {
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
        typeBlog: form.typeBlog,
        blogTitle: form.blogTitle,
        blogDetail: form.blogDetail,
        image: file,
      });

      // Await the fetch call
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_NEXT_API as string}/createBlog`,
        {
          method: "POST",
          headers: myHeaders,
          body: raw,
        }
      );

      const result = await response.json();

      if (result.status === "ok") {
        router.back();
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

  const typeBlog: { label: string; value: string }[] = [
    {
      label: "ข่าวสาร",
      value: "news",
    },
    {
      label: "โปรโมชั่น",
      value: "promotion",
    },
  ];
  return (
    <>
      <form onSubmit={form.onSubmit((value) => createProduct(value))}>
        <Paper shadow="xs" radius="lg" p={"xl"}>
          <Stack gap="lg" align="stretch" justify="center">
            <SimpleGrid cols={2} spacing="md" verticalSpacing="md">
              <Select
                size="md"
                data={typeBlog?.map((blog) => {
                  return {
                    label: blog.label,
                    value: blog.value,
                  };
                })}
                label="ประเภทข่าวสาร"
                radius={"md"}
                key={form.key("typeBlog")}
                {...form.getInputProps("typeBlog")}
              />

              <TextInput
                size="md"
                label="หัวเรื่อง"
                radius={"md"}
                key={form.key("blogTitle")}
                {...form.getInputProps("blogTitle")}
              />
            </SimpleGrid>
            <Textarea
              size="md"
              radius={"md"}
              label="รายละเอียดข่าวสาร"
              key={form.key("blogDetail")}
              {...form.getInputProps("blogDetail")}
            />
          </Stack>
        </Paper>
        <Paper shadow="xs" radius="lg" p={"xl"} mt={"lg"}>
          อัพโหลดภาพ
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
                  Attach as many files as you like, each file should not exceed
                  5mb
                </Text>
              </div>
            </Group>
          </Dropzone>
          <SimpleGrid
            cols={{ base: 1, sm: 4 }}
            mt={previews.length > 0 ? "xl" : 0}
          >
            {previews}
          </SimpleGrid>
        </Paper>

        <Flex gap="md" justify="end" align="end" mt={"lg"}>
          <Button type="submit">ยืนยันเพิ่มข่าวสาร</Button>
        </Flex>
      </form>
    </>
  );
}

export default CreateProduct;
