import {
  Modal,
  Stack,
  TextInput,
  Divider,
  TagsInput,
  Textarea,
  Flex,
  FileButton,
  Button,
  Anchor,
  Box,
  Image,
  Text,
} from "@mantine/core";
import { useCounter } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { useState } from "react";
import { useForm, isNotEmpty } from "@mantine/form";

function CreateChatBot(props: {
  opened: boolean;
  close: () => void;
  branchId: string;
  brandRefetch: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const [count, handlers] = useCounter(0, { min: 0, max: 5 });
  const [file, setFile] = useState<File | null>(null);
  const [keyword, setKeyword] = useState<string[]>([]);
  const [buttonLink, setButtonLink] = useState<string[]>([]);

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      title: "",
      question: "",
      answer: "",
    },
    validate: {
      title: isNotEmpty("Enter chat bot title"),
      question: isNotEmpty("Enter chat bot question"),
      answer: isNotEmpty("Enter chat bot answer"),
    },
  });

  const imageUrl = file ? URL.createObjectURL(file) : "";

  const previews = file ? (
    <Flex direction={"row"} gap={"md"} align={"center"} justify={"start"}>
      <Image
        alt="preview image"
        src={imageUrl}
        height={150}
        onLoad={() => URL.revokeObjectURL(imageUrl)}
      />
      <Text size="sm" ta="center" mt="sm">
        Picked file: {file.name}
      </Text>
    </Flex>
  ) : null;

  const link = Array(count)
    .fill(0)
    .map((_, key) => {
      return (
        <Box key={key} my={"md"}>
          <TextInput
            label={"ป้ายชื่อปุ่ม"}
            onChange={(e) => {
              const value = e.target.value;
              setButtonLink((prevLinks) => {
                const newLinks = [...prevLinks];
                newLinks[key] = value;
                return newLinks;
              });
            }}
          />
          <Anchor onClick={handlers.decrement}>ลบรายการปุ่ม</Anchor>
        </Box>
      );
    });
  const createChatbot = async (
    title: string,
    question: string,
    answer: string
  ) => {
    setLoading(true);
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const handleBase64 = (file: File | null): Promise<string | null> => {
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
      const getBase64 = file ? await handleBase64(file) : "";

      const raw = JSON.stringify({
        branchId: props.branchId,
        title: title,
        question: question,
        answer: answer,
        image: getBase64,
        buttonLink: buttonLink,
        keyword: keyword,
      });

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_NEXT_API as string}/createChatBot`,
        {
          method: "POST",
          headers: myHeaders,
          body: raw,
        }
      );

      const result = await response.json();

      if (result.status === "ok") {
        notifications.show({
          title: "success system",
          message: "เพิ่ม chat bot สำเร็จ",
          color: "green",
        });
        props.brandRefetch();
      } else {
        setLoading(false);
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
  return (
    <Modal
      size={"xl"}
      opened={props.opened}
      onClose={props.close}
      title="เพิ่มรายการข้อความตอบกลับอัตโนมัติ"
      centered
    >
      <form
        onSubmit={form.onSubmit((value) => {
          createChatbot(value.title, value.question, value.answer);
        })}
      >
        <Stack gap="md" align="stretch" justify="center">
          <TextInput
            label="หัวข้อรายการข้อความตอบกลับ"
            withAsterisk
            key={form.key("title")}
            {...form.getInputProps("title")}
          />
          <Divider />
          <TextInput
            label="คำถาม"
            withAsterisk
            key={form.key("question")}
            {...form.getInputProps("question")}
          />
          <TagsInput
            label="คีย์เวิร์ด"
            description="เพิ่มคีย์เวิร์ดหรือวลีได้สูงสุด 5 รายการ ข้อความตอบกลับอัตโนมัติจะส่งเมื่อข้อความเข้ามีคำที่เป็นคีย์เวิร์ด"
            maxTags={5}
            value={keyword}
            onChange={setKeyword}
          />
          <Textarea
            label="ข้อความตอบกลับอัตโนมัติ"
            withAsterisk
            key={form.key("answer")}
            {...form.getInputProps("answer")}
          />
        </Stack>
        <Text mt={"md"}>เพิ่มในการตอบกลับ</Text>
        {link}
        {previews}
        <Flex
          gap="md"
          justify="flex-start"
          align="flex-start"
          direction="row"
          wrap="nowrap"
          my={"md"}
        >
          <FileButton onChange={setFile}>
            {(props) => (
              <Button {...props} disabled={file !== null}>
                สื่อ
              </Button>
            )}
          </FileButton>
          <Button onClick={handlers.increment} disabled={count > 4}>
            ปุ่ม
          </Button>
        </Flex>
        <Divider my={"md"} />
        <Flex justify={"end"}>
          <Button color="brand" type="submit" loading={loading}>
            ยืนยันการเพิ่มรายการข้อความตอบกลับอัตโนมัติ
          </Button>
        </Flex>
      </form>
    </Modal>
  );
}

export default CreateChatBot;
