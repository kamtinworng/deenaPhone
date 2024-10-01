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
} from "@mantine/core";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import {
  IconDeviceFloppy,
  IconPhoto,
  IconUpload,
  IconX,
} from "@tabler/icons-react";

function NewBranch() {
  return (
    <>
      <Title c={"brand"}>Profile</Title>
      <Text>
        This information will be displayed publicly so be careful what you
        share.
      </Text>
      <Paper shadow="xs" radius="lg" withBorder p={"lg"} mt={"md"}>
        <Stack gap="md" align="stretch" justify="center">
          <TextInput
            label="Code brand"
            description="รหัสสำหรับอ้างอิงถึงสาขา"
            placeholder="กรุณากรอกโค้ดสำหรับสาขา ex. brandDeena01"
            required
          />
          <TextInput
            label="Name brand"
            description="ชื่อที่บ่กบอกถึงสาขานั้น"
            placeholder="กรุณากรอกชื่อสาขา"
            required
          />
          <Text>รูปภาพสาขา</Text>
          <Dropzone
            onDrop={(files) => console.log("accepted files", files)}
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
          <Divider mt={"lg"} />
          <Flex justify={"end"}>
            <Flex gap="lg" align="stretch" justify="center" direction={"row"}>
              <UnstyledButton>Cancel</UnstyledButton>
              <Button
                color={"brand"}
                leftSection={<IconDeviceFloppy size={14} />}
              >
                Save
              </Button>
            </Flex>
          </Flex>
        </Stack>
      </Paper>
    </>
  );
}

export default NewBranch;
