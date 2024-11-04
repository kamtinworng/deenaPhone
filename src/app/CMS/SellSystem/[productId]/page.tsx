"use client";
import "dayjs/locale/th";

import { useFetch } from "@mantine/hooks";
import {
  Container,
  Flex,
  Paper,
  SimpleGrid,
  Title,
  Image,
  Group,
  Text,
  NumberFormatter,
  Stack,
  TextInput,
  Radio,
  FileInput,
  rem,
  Grid,
  GridCol,
  List,
  Button,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { IconFile } from "@tabler/icons-react";
import { DatePicker } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { notifications } from "@mantine/notifications";

export interface TYPECUSTOMER {
  customerName: string;
  facebookLink: string;
  tel: string;
  recipientId: string;
  screenId: string;
  timeCode: string;
  icloudPhoneNumber: string;
}

interface Product {
  id: string;
  images: string[];
  deviceName: string;
  deviceDetail: string;
  indentifier: string;
  price: number; // ราคาเต็ม
  deposit: number; // เงินดาวน์
  numberOfInstallments: string; // จำนวนงวด
  icloud: string | null;
  passwordIcloud: string | null;
  lockscreen: string;
  idLoad: string;
  passwordIdLoad: string;
  branch: { name: string };
}

function SellProduct({ params }: { params: { productId: string } }) {
  const { data: product } = useFetch<Product>(
    `${process.env.NEXT_PUBLIC_NEXT_API}/getProduct?productId=${params.productId}`
  );

  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const session = useSession();

  const toDay = new Date();
  toDay.setMonth(toDay.getMonth() + 1);

  const [value, setValue] = useState<Date | null>(toDay);
  const [image, setImage] = useState(product?.images[0]);

  const [paymentAgreementFile, setPaymentAgreementFile] = useState<File | null>(
    null
  );
  const [deviceImeiImageFile, setDeviceImeiImageFile] = useState<File | null>(
    null
  );
  const [idCardImage, setIdCardImage] = useState<File | null>(null);
  const [houseRegistrationImage, setHouseRegistrationImage] =
    useState<File | null>(null);
  const [customerReceivingImage, setCustomerReceivingImage] =
    useState<File | null>(null);

  const [downPaymentChoice, setDownPaymentChoice] = useState("");

  useEffect(() => {
    setImage(product?.images[0]);
  }, [product]);

  const dueDate = Array.from(
    { length: parseInt(product?.numberOfInstallments as string) - 1 },
    (_, index) => {
      if (value) {
        const currentDate = new Date(value);
        currentDate.setMonth(currentDate.getMonth() + index + 1);
        return (
          <Flex direction={"column"} gap="md" key={index}>
            <Text>งวด {index + 2}</Text>
            <DatePicker
              size="md"
              locale="th"
              value={currentDate}
              date={currentDate}
            />
          </Flex>
        );
      }
    }
  );

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      customerName: "",
      facebookLink: "",
      recipientId: "",
      tel: "",
      screenId: "",
      timeCode: "",
      icloudPhoneNumber: "",
    },
    validate: {
      customerName: (value) => (value === "" ? "กรุณากรอกชื่อลูกค้า" : null),
      facebookLink: (value) =>
        value === "" ? "กรุณากรอก LINK หรือ ชื่อ Facebook ของลูกค้า" : null,
      recipientId: (value) => (value === "" ? "กรุณากรอก PSID" : null),
      tel: (value) =>
        value.length < 1 || value.length < 10
          ? "กรุณากรอกเบอร์โทรศัพท์ของลูกค้า 10 หลัก"
          : null,
    },
  });

  const onSubmit = async (props: { form: TYPECUSTOMER }) => {
    const customer = props.form;
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const handleChange = (file: File | null): Promise<string | null> => {
      return new Promise((resolve, reject) => {
        if (file === null) {
          resolve(null);
          return;
        }

        const reader = new FileReader();
        reader.onload = (event) => {
          if (typeof event.target?.result !== "string") {
            reject(new Error("Invalid file result"));
            return;
          }

          const dataUri = event.target.result;
          const [, base64] = dataUri.split(",");
          resolve(base64);
        };

        reader.onerror = () => reject(new Error("File reading failed"));

        reader.readAsDataURL(file);
      });
    };

    const paymentAgreementFileBase64 = await handleChange(paymentAgreementFile);
    const deviceImeiImageFileBase64 = await handleChange(deviceImeiImageFile);
    const idCardImageBase64 = await handleChange(idCardImage);
    const houseRegistrationImageBase64 = await handleChange(
      houseRegistrationImage
    );
    const customerReceivingImage64 = await handleChange(customerReceivingImage);

    const raw = JSON.stringify({
      customerName: customer.customerName,
      facebookLink: customer.facebookLink,
      tel: customer.tel,
      dueDate: value,
      recipientId: customer.recipientId,
      screenId: customer.screenId,
      timeCode: customer.timeCode,
      icloudPhoneNumber: customer.icloudPhoneNumber,
      downPaymentChoice: downPaymentChoice,
      paymentAgreementFile: paymentAgreementFileBase64,
      deviceImeiImageFile: deviceImeiImageFileBase64,
      idCardImage: idCardImageBase64,
      houseRegistrationImage: houseRegistrationImageBase64,
      customerReceivingImage: customerReceivingImage64,
      productId: product?.id,
      userId: session.data?.user.id,
    });

    fetch(
      `${process.env.NEXT_PUBLIC_NEXT_API as string}/createInstallmentPayment`,
      {
        method: "POST",
        headers: myHeaders,
        body: raw,
      }
    )
      .then((res) => res.json())
      .then((value: { message: string; id: string | null }) => {
        if (value.id) {
          router.push(`../InstallmentPayments/${value.id}`);
        } else {
          notifications.show({
            message: value.message,
            color: "red",
          });
        }
      });
  };

  return (
    <Container fluid>
      <Paper shadow="xs" radius="sm" p={"lg"}>
        <Flex mt={"lg"}>
          <Grid justify="flex-start" align="flex-start" grow>
            <GridCol span={1}>
              <Flex direction={"column"} gap={"lg"}>
                <Image alt="preview image" src={image} h={250} radius={"md"} />
                <SimpleGrid cols={3}>
                  {product?.images.map((image, index) => {
                    if (index > 2) return;
                    return (
                      <Image
                        key={index}
                        alt="preview image"
                        src={image}
                        h={150}
                        radius={"md"}
                        style={{ cursor: "pointer" }}
                        onClick={() => setImage(image)}
                      />
                    );
                  })}
                </SimpleGrid>
              </Flex>
            </GridCol>
            <GridCol span={"auto"}>
              <Group mt={"md"}>
                <Stack gap="md" align="stretch" justify="center">
                  <Title order={2}>{product?.deviceName}</Title>
                  <Title order={3}>
                    <NumberFormatter
                      prefix="฿ "
                      value={product?.price}
                      suffix=" THB"
                    />
                  </Title>
                  <Text>{product?.deviceDetail}</Text>
                  <List>
                    <List.Item>iCloud : {product?.icloud}</List.Item>
                    <List.Item>
                      รหัสผ่าน iCloud : {product?.passwordIcloud}
                    </List.Item>
                    <List.Item>รหัสอีมี่ : {product?.indentifier}</List.Item>
                    <List.Item>ไอโหลด : {product?.idLoad}</List.Item>
                    <List.Item>
                      รหัสผ่านไอโหลด : {product?.passwordIdLoad}
                    </List.Item>
                    <List.Item>
                      รหัสปลดล็อคเครื่อง : {product?.lockscreen}
                    </List.Item>
                    <List.Item>
                      จำนวนงวด : {product?.numberOfInstallments}
                    </List.Item>
                  </List>
                </Stack>
              </Group>
            </GridCol>
          </Grid>
        </Flex>
      </Paper>
      <Paper shadow="xs" radius="md" p={"lg"} mt={"lg"}>
        <Group mt={"md"} gap="md" grow>
          <form
            onSubmit={form.onSubmit((values) => {
              setLoading(true);
              onSubmit({
                form: values,
              });
            })}
          >
            <Stack gap="md" align="stretch" justify="center">
              <Title order={3}>Information customer</Title>
              <SimpleGrid cols={1} spacing="md" verticalSpacing="md">
                <TextInput
                  label="ชื่อลูกค้า"
                  size="md"
                  key={form.key("customerName")}
                  {...form.getInputProps("customerName")}
                  withAsterisk
                />
                <TextInput
                  label="Facebook"
                  size="md"
                  key={form.key("facebookLink")}
                  {...form.getInputProps("facebookLink")}
                  withAsterisk
                />
                <TextInput
                  label="PSID"
                  size="md"
                  key={form.key("recipientId")}
                  {...form.getInputProps("recipientId")}
                  withAsterisk
                />
                <TextInput
                  label="รหัสเวลา"
                  size="md"
                  key={form.key("timeCode")}
                  {...form.getInputProps("timeCode")}
                  withAsterisk
                />
                <TextInput
                  label="รหัสหน้าจอ"
                  size="md"
                  key={form.key("screenId")}
                  {...form.getInputProps("screenId")}
                  withAsterisk
                />
                <TextInput
                  label="เบอร์สมัครไอคราว"
                  size="md"
                  key={form.key("icloudPhoneNumber")}
                  {...form.getInputProps("icloudPhoneNumber")}
                  withAsterisk
                />
                <TextInput
                  label="เบอร์โทรสำหรับติดต่อ"
                  size="md"
                  key={form.key("tel")}
                  {...form.getInputProps("tel")}
                  withAsterisk
                />
              </SimpleGrid>
              <Title order={3} mt={"lg"}>
                Installment payments
              </Title>
              <Radio.Group
                label="เลือกการจ่ายเงินดาวน์"
                withAsterisk
                size="md"
                onChange={setDownPaymentChoice}
                value={downPaymentChoice}
              >
                <Group mt="xs">
                  <Radio value="cashPayment" label="จ่ายแบบเงินสด" />
                  <Radio value="bankTransferPayment" label="จ่ายผ่านธนาคาร" />
                </Group>
              </Radio.Group>
              <FileInput
                leftSection={
                  <IconFile
                    style={{ width: rem(18), height: rem(18) }}
                    stroke={1.5}
                  />
                }
                label="สัญญาผ่อน"
                placeholder="สัญญาผ่อน"
                leftSectionPointerEvents="none"
                size="md"
                withAsterisk
                value={paymentAgreementFile}
                onChange={setPaymentAgreementFile}
              />
              <FileInput
                leftSection={
                  <IconFile
                    style={{ width: rem(18), height: rem(18) }}
                    stroke={1.5}
                  />
                }
                label="รูปอีมี่ที่เครื่อง"
                placeholder="รูปอีมี่ที่เครื่อง"
                leftSectionPointerEvents="none"
                size="md"
                withAsterisk
                value={deviceImeiImageFile}
                onChange={setDeviceImeiImageFile}
              />
              <FileInput
                leftSection={
                  <IconFile
                    style={{ width: rem(18), height: rem(18) }}
                    stroke={1.5}
                  />
                }
                label="รูปบัตรประชาชน"
                placeholder="รูปบัตรประชาชน"
                leftSectionPointerEvents="none"
                size="md"
                withAsterisk
                value={idCardImage}
                onChange={setIdCardImage}
              />
              <FileInput
                leftSection={
                  <IconFile
                    style={{ width: rem(18), height: rem(18) }}
                    stroke={1.5}
                  />
                }
                label="รูปหน้า Facebook"
                placeholder="รูปหน้า Facebook"
                leftSectionPointerEvents="none"
                size="md"
                withAsterisk
                onChange={setHouseRegistrationImage}
                value={houseRegistrationImage}
              />
              <FileInput
                leftSection={
                  <IconFile
                    style={{ width: rem(18), height: rem(18) }}
                    stroke={1.5}
                  />
                }
                label="รูปลูกค้ารับสินค้า"
                placeholder="รูปลูกค้ารับสินค้า"
                leftSectionPointerEvents="none"
                size="md"
                withAsterisk
                onChange={setCustomerReceivingImage}
                value={customerReceivingImage}
              />

              <Title order={3} mt={"lg"}>
                Due date payment
              </Title>
              <SimpleGrid
                cols={{ xl: 3, lg: 1, sm: 2 }}
                spacing="md"
                verticalSpacing="md"
              >
                <Flex direction={"column"} gap="md">
                  <Text>งวดที่ 1</Text>
                  <DatePicker
                    value={value}
                    onChange={setValue}
                    locale="th"
                    defaultDate={toDay}
                    size="md"
                  />
                </Flex>
                {dueDate}
              </SimpleGrid>
            </Stack>
            <Button mt={"xl"} fullWidth type="submit" loading={loading}>
              ยืนยันการผ่อนชำระสินค้า
            </Button>
          </form>
        </Group>
      </Paper>
    </Container>
  );
}

export default SellProduct;
