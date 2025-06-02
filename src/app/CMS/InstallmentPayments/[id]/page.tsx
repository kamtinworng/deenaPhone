"use client";
import {
  Grid,
  Text,
  Paper,
  NumberFormatter,
  Divider,
  Title,
  List,
  rem,
  ThemeIcon,
  Anchor,
  Flex,
  Table,
  Badge,
  Button,
  Stack,
  Image,
  SimpleGrid,
} from "@mantine/core";
import dayjs from "dayjs";
import { useDisclosure, useFetch } from "@mantine/hooks";
import {
  IconBrandFacebook,
  IconCash,
  IconPhone,
  IconUser,
} from "@tabler/icons-react";
import "dayjs/locale/th";
import { TYPEINSTALLMENTPAYMENT } from "./typeInstallmentPayment";
import Payment from "./components/payment";
import TimeLine from "./components/timeline";
import ProductDetail from "./components/productDetail";
import CustomerDetail from "./components/customerDetail";
import SetBreadcrumbs, {
  TYPEBREADCRUMBS,
} from "../../../../../libs/breadcrumbs";
function Page({ params }: { params: { id: string } }) {
  const { data: installmentPayment } = useFetch<TYPEINSTALLMENTPAYMENT>(
    `${process.env.NEXT_PUBLIC_NEXT_API}/getInstallmentPayment?id=${params.id}`
  );

  dayjs.locale("th");
  const createdAt = dayjs(installmentPayment?.createdAt).format(
    "DD / MMM / YYYY"
  );

  const [opened, { open, close }] = useDisclosure(false);

  const dueDateStatusNotPaid = installmentPayment?.dueDates ? installmentPayment?.dueDates.filter(
    (f) => f.paymentStatus !== "paid"
  ) : [];

  const dueDateStatusPaid = installmentPayment?.dueDates ? installmentPayment?.dueDates.filter(
    (f) => f.paymentStatus === "paid"
  ) : [];

  const paided = installmentPayment
    ? installmentPayment?.dueDates ? installmentPayment?.dueDates.reduce((a, b) => a + (b.pricePaid || 0), 0) +
      installmentPayment?.over
      : 0 : 0;

  const rowsNotPaid = dueDateStatusNotPaid?.map((item, index) => {
    const dueDate = dayjs(item.dueDate).format("DD / MMM / YYYY");
    const updatedAt = !item.updatedAt ? (
      <Text size="sm" c="dimmed" fs="italic">
        ยังไม่มีการอัพเดต
      </Text>
    ) : (
      dayjs(item.updatedAt).format("DD / MMM / YYYY")
    );

    const payment = installmentPayment ? installmentPayment : null;
    const firstItem = payment ? payment.over : 0;

    return (
      <Table.Tr key={item.id}>
        <Table.Td>{item.id}</Table.Td>
        <Table.Td>{dueDate}</Table.Td>
        <Table.Td>
          <NumberFormatter
            prefix="฿ "
            value={payment?.product.installmentAmount}
            thousandSeparator
          />
        </Table.Td>
        <Table.Td>
          <NumberFormatter
            prefix="฿ "
            value={index === 0 ? firstItem : item.pricePaid}
            thousandSeparator
          />
        </Table.Td>
        <Table.Td>
          <Badge
            variant="light"
            color={
              item.paymentStatus === "pending"
                ? "yellow"
                : item.paymentStatus === "paid"
                  ? "green"
                  : "red"
            }
          >
            {item.paymentStatus}
          </Badge>
        </Table.Td>
        <Table.Td>{updatedAt}</Table.Td>
      </Table.Tr>
    );
  });

  const rowsPaid = dueDateStatusPaid?.map((item) => {
    const dueDate = dayjs(item.dueDate).format("DD / MMM / YYYY");
    const updatedAt = !item.updatedAt ? (
      <Text>ยังไม่มีการอัพเดต</Text>
    ) : (
      dayjs(item.updatedAt).format("DD / MMM / YYYY")
    );

    return (
      <Table.Tr key={item.id}>
        <Table.Td>{item.id}</Table.Td>
        <Table.Td>{dueDate}</Table.Td>
        <Table.Td>
          <NumberFormatter
            prefix="฿ "
            value={installmentPayment?.product.installmentAmount}
            thousandSeparator
          />
        </Table.Td>
        <Table.Td>
          <NumberFormatter
            prefix="฿ "
            value={item.pricePaid}
            thousandSeparator
          />
        </Table.Td>
        <Table.Td>
          <Badge
            variant="light"
            color={
              item.paymentStatus === "pending"
                ? "yellow"
                : item.paymentStatus === "paid"
                  ? "green"
                  : "red"
            }
          >
            {item.paymentStatus}
          </Badge>
        </Table.Td>
        <Table.Td>{updatedAt}</Table.Td>
      </Table.Tr>
    );
  });
  const breadcrumbs: TYPEBREADCRUMBS[] = [
    {
      title: "รายการขายทั้งหมด",
      href: "./",
    },
    {
      title: installmentPayment?.code ?? "",
      href: "",
    },
  ];

  return (
    <>
      <SetBreadcrumbs breadcrumbs={breadcrumbs} />

      <Payment
        open={opened}
        close={() => close()}
        installmentPayment={installmentPayment}
      />
      <Grid grow>
        <Grid.Col span={8}>
          <Stack gap="md" align="stretch" justify="center">
            <ProductDetail
              installmentPayment={installmentPayment}
              customer={false}
            />
            <CustomerDetail installmentPayment={installmentPayment} />
          </Stack>
          <Paper p={"md"} withBorder shadow="xs" radius="sm" mt={"lg"}>
            Invoice
            <Flex
              direction={{
                lg: "row",
                xs: "column",
                md: "column",
                sm: "column",
              }}
              justify={"space-between"}
              mt={"md"}
            >
              <Flex direction={"column"}>
                <Text>Code : {installmentPayment?.code}</Text>
                <Text size="sm" c={"dimmed"}>
                  no. {installmentPayment?.id}
                </Text>
              </Flex>
              <Text>วันที่ทำรายการ : {createdAt}</Text>
            </Flex>
            <Divider mt={"md"} />
            <Flex
              gap="md"
              justify="space-between"
              align="center"
              direction="row"
              wrap="nowrap"
              mt={"lg"}
            >
              <Text>ตารางงวดการผ่อนชำระ</Text>
              <Button
                leftSection={<IconCash size={14} />}
                color="brand"
                onClick={open}
              >
                ผ่อนชำระ
              </Button>
            </Flex>
            <Table.ScrollContainer minWidth={1000}>
              <Table mt={"lg"} highlightOnHover>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>Invoice id</Table.Th>
                    <Table.Th>วันที่ผ่อน</Table.Th>
                    <Table.Th>ราคางวด</Table.Th>
                    <Table.Th>จ่ายแล้ว</Table.Th>
                    <Table.Th>สถานะ</Table.Th>
                    <Table.Th>วันที่มีการอัพเดต</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {rowsPaid}
                  {rowsNotPaid}
                </Table.Tbody>
              </Table>
            </Table.ScrollContainer>
          </Paper>
        </Grid.Col>
        <Grid.Col span={2}>
          <Paper shadow="xs" radius="sm" bg="white" withBorder p={"md"}>
            <Title order={4}>รายการจ่าย</Title>
            <Text size="xs" mt={"sm"}>
              ราคาสินค้า
            </Text>
            <Text size="lg">
              <NumberFormatter
                prefix="฿ "
                value={installmentPayment?.product?.price}
                thousandSeparator
              />
            </Text>

            <Text size="xs" mt={"sm"}>
              จ่ายแล้ว
            </Text>
            <Text size="sm" c={"green"}>
              <NumberFormatter prefix="฿ " value={paided} thousandSeparator />
            </Text>

            <Text size="xs" mt={"sm"}>
              คงเหลือ
            </Text>
            <Text size="sm" c={"red"}>
              <NumberFormatter
                prefix="฿ "
                value={installmentPayment?.remainingAmount}
                thousandSeparator
              />
            </Text>
            <Divider mt={"sm"} />
            <List mt={"lg"} spacing="xs" size="sm" center>
              <List.Item
                icon={
                  <ThemeIcon color="brand" size={24} radius="xl">
                    <IconUser style={{ width: rem(16), height: rem(16) }} />
                  </ThemeIcon>
                }
              >
                {installmentPayment?.customerName}
              </List.Item>
              <List.Item
                icon={
                  <ThemeIcon color="brand" size={24} radius="xl">
                    <IconBrandFacebook
                      style={{ width: rem(16), height: rem(16) }}
                    />
                  </ThemeIcon>
                }
              >
                {installmentPayment?.facebookLink}
              </List.Item>
              <List.Item
                icon={
                  <ThemeIcon color="brand" size={24} radius="xl">
                    <IconPhone style={{ width: rem(16), height: rem(16) }} />
                  </ThemeIcon>
                }
              >
                {installmentPayment?.tel}
              </List.Item>
            </List>
            <Divider mt={"sm"} mb={"sm"} />
            <Anchor size="xs" c={"brand"} underline="never">
              Download receipt →
            </Anchor>
          </Paper>
          <Title mt={"lg"} order={5}>
            Activity
          </Title>

          <TimeLine data={installmentPayment} />
        </Grid.Col>
      </Grid>
      <Paper shadow="xs" radius="sm" p={"md"} mt={"md"}>
        <SimpleGrid
          cols={{ lg: 4, md: 3, sm: 2 }}
          spacing="md"
          verticalSpacing="md"
        >
          {installmentPayment?.receiptImage ? installmentPayment?.receiptImage.map((image, index) => {
            return (
              <Image
                alt="receipt image"
                src={image}
                key={index}
                radius={"md"}
              />
            );
          }) : <></>}
        </SimpleGrid>
      </Paper>
    </>
  );
}
export default Page;
