"use client";
import {
  Image,
  Title,
  Paper,
  Divider,
  Stack,
  Text,
  Progress,
  Button,
  NumberFormatter,
  Grid,
  List,
  rem,
  ThemeIcon,
  TextInput,
  Flex,
  Pagination,
  SimpleGrid,
} from "@mantine/core";
import { useDebouncedState, useFetch } from "@mantine/hooks";
import { IconCircleCheck, IconSearch } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export interface TYPEINSTALLMENTPAYMENT {
  findInstallmentPayments: {
    id: string;
    code: string;
    product: {
      deviceName: string;
      images: string[];
      price: number;
      deviceDetail: string;
    };
    dueDates: {
      paymentStatus: "pending" | "paid" | "overdue";
    }[];
    customerName: string;
    facebookLink: string;
    tel: string;
    customerReceivingImage: string;
    statusInstallmentPayment: "inProgress" | "Hold" | "Cancel" | "Success";
  }[];
  countFindInstallmentPayments: number;
}

function InstallmentPayments() {
  const [search, setSearch] = useDebouncedState("", 200);
  const [name, setName] = useDebouncedState("", 200);
  const [page, setPage] = useState(1);

  const { data: installmentPayments } = useFetch<TYPEINSTALLMENTPAYMENT>(
    `${process.env.NEXT_PUBLIC_NEXT_API}/getInstallmentPayments?search=${search}&name=${name}&page=${page}`
  );

  const router = useRouter();

  return (
    <>
      <Title mt={"lg"}>InstallmentPayments</Title>

      <Divider mt={"md"} />
      <SimpleGrid cols={2} >
        <TextInput
          mt={"md"}
          label="Search Code"
          placeholder="Ex. deenaXX"
          size="lg"
          radius={"md"}
          leftSection={<IconSearch size={20} />}
          onChange={(e) => setSearch(e.currentTarget.value)}
        />
        <TextInput
          mt={"md"}
          label="ค้นหาด้วยชื่อ"
          size="lg"
          radius={"md"}
          leftSection={<IconSearch size={20} />}
          onChange={(e) => setName(e.currentTarget.value)}
        />
      </SimpleGrid>

      <Paper
        bg={`var(--mantine-color-gray-2)`}
        radius={"md"}
        p={"md"}
        mt={"lg"}
      >
        <Flex
          gap="md"
          justify="space-between"
          align="flex-start"
          direction="row"
          wrap="nowrap"
        >
          <Title order={2} c={"brand"}>
            ตารางข้อมูลการขายทั้งหมด
          </Title>
          <Pagination
            total={installmentPayments?.countFindInstallmentPayments ?? 0}
            color="brand"
            value={page}
            onChange={setPage}
          />
        </Flex>
        <Stack mt={"md"}>
          {installmentPayments?.findInstallmentPayments?.map((item) => {
            const countReceipt = item.dueDates.reduce((count, current) => {
              return current.paymentStatus === "paid" ? count + 1 : count;
            }, 0);

            const progress = (countReceipt * 100) / item.dueDates.length;
            return (
              <Paper
                p={"lg"}
                radius={"md"}
                key={item.id}
                shadow="md"
                withBorder
              >
                <Text>{item.code}</Text>
                <Grid gutter="lg" justify={"center"} align={"center"} grow>
                  <Grid.Col span={"auto"}>
                    <Image
                      alt="iamge"
                      src={item.customerReceivingImage}
                      height={250}
                      radius={"md"}
                    />
                  </Grid.Col>
                  <Grid.Col span={{ lg: 1, md: 1, sm: 5 }}>
                    <Text size="lg" fw={700}>
                      {item.product.deviceName}
                    </Text>
                    <NumberFormatter
                      prefix="฿ "
                      value={item.product.price}
                      thousandSeparator
                    />
                    <Text c="dimmed" size="sm">
                      {item.product.deviceDetail}
                    </Text>
                  </Grid.Col>
                  <Grid.Col span={"auto"}>
                    <Title order={4}>ข้อมูลลูกค้า</Title>
                    <List
                      mt={"lg"}
                      spacing="xs"
                      size="sm"
                      center
                      icon={
                        <ThemeIcon color="teal" size={24} radius="xl">
                          <IconCircleCheck
                            style={{ width: rem(16), height: rem(16) }}
                          />
                        </ThemeIcon>
                      }
                    >
                      <List.Item>Customer name:{item.customerName}</List.Item>
                      <List.Item>Facebook : {item.facebookLink}</List.Item>
                      <List.Item>TEL : {item.tel}</List.Item>
                    </List>
                  </Grid.Col>
                </Grid>
                <Divider mt={"lg"} />
                <Stack mt={"md"} gap="md" align="stretch" justify="center">
                  <Text size="sm" c="dimmed">
                    เปอร์เซ็นความคืบหน้าของรายการผ่อน
                  </Text>
                  <Progress.Root size="xl">
                    <Progress.Section value={progress}>
                      <Progress.Label>{progress} %</Progress.Label>
                    </Progress.Section>
                  </Progress.Root>
                  <Button
                    fullWidth
                    color="brand"
                    onClick={() => {
                      router.push(`./InstallmentPayments/${item.id}`);
                    }}
                  >
                    รายละเอียด
                  </Button>
                </Stack>
              </Paper>
            );
          })}
        </Stack>
      </Paper>
    </>
  );
}

export default InstallmentPayments;
