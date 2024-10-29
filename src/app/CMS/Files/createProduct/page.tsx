"use client";
import {
  Group,
  NumberInput,
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
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useFetch } from "@mantine/hooks";
import { TYPE_BRANDS } from "../../Branches/page";
import { Dropzone, FileWithPath, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { IconUpload, IconX, IconPhoto } from "@tabler/icons-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { notifications } from "@mantine/notifications";

interface INPUTPRODUCT {
  brandCode: string;
  productName: string;
  deviceDetail: string;
  price: number;
  deposit: number;
  numberOfInstallments: number;
  installmentAmount: number;
  Icloud: string;
  passwordIclound: string;
  lockscreen: string;
  idLoad: string;
  passwordIdLoad: string;
  imei: string;
}

function CreateProduct() {
  const { data: brands } = useFetch<TYPE_BRANDS[]>(
    `${process.env.NEXT_PUBLIC_NEXT_API}/getBrands`
  );

  const [loading, setLoading] = useState(false);

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
      brandCode: "",
      productName: "",
      deviceDetail: "",
      price: 0,
      deposit: 0,
      numberOfInstallments: 0,
      installmentAmount: 0,
      Icloud: "",
      passwordIclound: "",
      lockscreen: "",
      idLoad: "",
      passwordIdLoad: "",
      imei: "",
    },
    validate: {
      brandCode: (value) =>
        value === "" ? "กรุณาเลือกสาขาที่สินค้าอยู่" : null,
      productName: (value) => (value === "" ? "กรุณากรอกชื่อสินค้า" : null),
      deviceDetail: (value) =>
        !value ? "กรุณากรอกรายละเอียดสินค้าสินค้า" : null,
      price: (value) => (value < 1 ? "กรุณาใส่ราคาสินค้า" : null),
      numberOfInstallments: (value) =>
        value < 1 ? "กรุณาใส่จำนวนงวดผ่อน" : null,
      installmentAmount: (value) =>
        value < 1 ? "กรุณาใส่จำนวนเงินต่อครั้งที่ผ่อนชำระ" : null,
      imei: (value) => (!value ? "กรุณากรอกเลขอีมี่" : null),
    },
  });

  const createProduct = async (form: INPUTPRODUCT) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const handleChange = (files: File[] | null): Promise<string[]> => {
      if (files === null) return Promise.resolve([]);

      const promises = files.map((file) => {
        return new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = (event) => {
            if (typeof event.target?.result !== "string") return reject();

            const dataUri = event.target.result;
            const [, base64] = dataUri.split(",");
            resolve(base64);
          };

          reader.onerror = () => reject();
          reader.readAsDataURL(file);
        });
      });

      return Promise.all(promises);
    };
    const base64 = await handleChange(files);

    const raw = JSON.stringify({
      brandCode: form.brandCode,
      productName: form.productName,
      deviceDetail: form.deviceDetail,
      price: form.price,
      deposit: form.deposit,
      numberOfInstallments: form.numberOfInstallments,
      Icloud: form.Icloud,
      passwordIclound: form.passwordIclound,
      installmentAmount: form.installmentAmount,
      lockscreen: form.lockscreen,
      idLoad: form.idLoad,
      passwordIdLoad: form.passwordIdLoad,
      imei: form.imei,
      images: base64,
    });

    const result = await fetch(
      `${process.env.NEXT_PUBLIC_NEXT_API as string}/createProduct`,
      {
        method: "POST",
        headers: myHeaders,
        body: raw,
      }
    );

    if (result.ok) {
      router.back();
    } else {
      notifications.show({
        message: "error",
        color: "red",
      });
    }
  };
  return (
    <>
      <form
        onSubmit={form.onSubmit((value) => {
          setLoading(true);
          createProduct(value);
        })}
      >
        <Paper shadow="xs" radius="lg" p={"xl"}>
          <Stack gap="lg" align="stretch" justify="center">
            <SimpleGrid cols={2} spacing="md" verticalSpacing="md">
              <Select
                size="md"
                data={brands?.map((brand) => {
                  return {
                    label: brand.name,
                    value: brand.id,
                  };
                })}
                label="สาขา"
                radius={"md"}
                key={form.key("brandCode")}
                {...form.getInputProps("brandCode")}
              />

              <TextInput
                size="md"
                label="ชื่อสินค้า"
                radius={"md"}
                key={form.key("productName")}
                {...form.getInputProps("productName")}
              />

              <TextInput
                size="md"
                label="รายละเอียดสินค้า"
                radius={"md"}
                key={form.key("deviceDetail")}
                {...form.getInputProps("deviceDetail")}
              />

              <NumberInput
                size="md"
                label="ราคาเต็ม"
                radius={"md"}
                key={form.key("price")}
                {...form.getInputProps("price")}
                min={0}
              />

              <NumberInput
                size="md"
                label="ราคาดาว"
                radius={"md"}
                key={form.key("deposit")}
                {...form.getInputProps("deposit")}
                min={0}
              />

              <NumberInput
                size="md"
                label="จำนวนงวดผ่อน"
                radius={"md"}
                key={form.key("numberOfInstallments")}
                {...form.getInputProps("numberOfInstallments")}
                min={0}
              />

              <NumberInput
                size="md"
                label="จำนวนเงินต่อครั้งที่ผ่อนชำระ"
                radius={"md"}
                key={form.key("installmentAmount")}
                {...form.getInputProps("installmentAmount")}
                min={0}
              />

              <TextInput
                size="md"
                label="ไอคลาวด์"
                radius={"md"}
                key={form.key("Icloud")}
                {...form.getInputProps("Icloud")}
              />

              <TextInput
                size="md"
                label="รหัสผ่าน ไอคลาวด์"
                radius={"md"}
                key={form.key("passwordIclound")}
                {...form.getInputProps("passwordIclound")}
              />

              <TextInput
                size="md"
                label="รหัสผ่านปลดล็อคเครื่อง"
                radius={"md"}
                key={form.key("lockscreen")}
                {...form.getInputProps("lockscreen")}
              />

              <TextInput
                size="md"
                label="ไอดีโหลด"
                radius={"md"}
                key={form.key("idLoad")}
                {...form.getInputProps("idLoad")}
              />

              <TextInput
                size="md"
                label="รหัสผ่าน ไอดีโหลด"
                radius={"md"}
                key={form.key("passwordIdLoad")}
                {...form.getInputProps("passwordIdLoad")}
              />

              <TextInput
                size="md"
                label="อีมี่"
                radius={"md"}
                key={form.key("imei")}
                {...form.getInputProps("imei")}
              />
            </SimpleGrid>
          </Stack>
        </Paper>
        <Paper shadow="xs" radius="lg" p={"xl"} mt={"lg"}>
          อัพโหลดภาพ
          <Dropzone
            onDrop={setFiles}
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
          <Button type="submit" loading={loading}>
            ยืนยันเพิ่มสินค้า
          </Button>
        </Flex>
      </form>
    </>
  );
}

export default CreateProduct;
