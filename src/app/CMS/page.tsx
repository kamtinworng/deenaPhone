"use client";

import { Anchor, Flex, Paper, Table, Title, Text, Group } from "@mantine/core";
import { useFetch } from "@mantine/hooks";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";

export interface TYPEINSTALLMENTPAYMENTTODAY {
  status: number;
  message: string | null;
  findInstallmentPayment: {
    pricePaid: number;
    id: string;
    installmentPayments: {
      id: string;
      customerName: string;
      code: string;
      product: {
        deviceName: string;
      };
    };
  }[];
}

function CMS() {
  const { data: installmentPayment } = useFetch<TYPEINSTALLMENTPAYMENTTODAY>(
    `${process.env.NEXT_PUBLIC_NEXT_API}/getInstallmentDay`
  );

  const router = useRouter();

  const rows =
    installmentPayment?.status === 200
      ? installmentPayment?.findInstallmentPayment.map((payment) => (
          <Table.Tr key={payment.id}>
            <Table.Td>{payment.id}</Table.Td>
            <Table.Td>{payment.installmentPayments.code}</Table.Td>
            <Table.Td>{payment.installmentPayments.customerName}</Table.Td>
            <Table.Td>
              {payment.installmentPayments.product.deviceName}
            </Table.Td>
            <Table.Td>
              <Anchor
                onClick={() =>
                  router.push(
                    `CMS/InstallmentPayments/${payment.installmentPayments.id}`
                  )
                }
              >
                ดำเนินการ
              </Anchor>
            </Table.Td>
          </Table.Tr>
        ))
      : "";

  return (
    <>
      <Paper p={"md"} shadow="xs" radius="xs">
        <Group justify={"space-between"}>
          <Flex direction={"column"}>
            <Title order={2}>รายการที่ต้องจ่ายในวันนี้ 📅</Title>
            <Text>รายการที่ต้องจ่ายในวันนี้ทั้งหมด</Text>
          </Flex>
          <Text>วันที่ : {dayjs(new Date()).format("DD / MMM / YYYY")}</Text>
        </Group>
        <Table.ScrollContainer minWidth={1000}>
          <Table
            striped
            highlightOnHover
            withTableBorder
            withColumnBorders
            my={"lg"}
            captionSide="bottom"
          >
            {installmentPayment?.status === 404 ? (
              <Table.Caption>{installmentPayment.message}</Table.Caption>
            ) : (
              ""
            )}
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Invoice</Table.Th>
                <Table.Th>Code</Table.Th>
                <Table.Th>customer name</Table.Th>
                <Table.Th>device name</Table.Th>
                <Table.Th></Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>
        </Table.ScrollContainer>
      </Paper>
    </>
  );
}

export default CMS;
