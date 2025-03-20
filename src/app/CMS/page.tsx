"use client";

import { Anchor, Flex, Paper, Table, Title, Text, Group, Pagination } from "@mantine/core";
import { useFetch } from "@mantine/hooks";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import GetInstallmentPayment from "./loader";
import { notifications } from "@mantine/notifications";
import { sendMessage } from "./sendMessage";

export interface TYPEINSTALLMENTPAYMENTTODAY {
  id: string;
  pricePaid: number;
  installmentPayments: {
    code: string;
    id: string;
    customerName: string;
    product: {
      deviceName: string;
    };
  } | null;
}

function CMS() {
  const router = useRouter();
  const [installmentPayment, setInstallmentPayment] = useState<TYPEINSTALLMENTPAYMENTTODAY[]>([])
  const [overInstallmentPayment, setOverInstallmentPayment] = useState<TYPEINSTALLMENTPAYMENTTODAY[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const res = await GetInstallmentPayment()
      await sendMessage()
      if (res.status !== 200) {
        notifications.show({
          message: 'กรุณาติดต่อ ADMIN',
          color: 'red'
        })
      }
      if (res.data) {
        setInstallmentPayment(res.data.findInstallmentPayment)
        setOverInstallmentPayment(res.data.findInstallmentPaymentMonth)
      }
    }
    fetchData()
  }, [])

  return (
    <>
      <Flex justify={"end"} mb={"md"}>
        <Text>วันที่ : {dayjs(new Date()).format("DD / MMM / YYYY")}</Text>
      </Flex>
      <Paper p={"md"} shadow="xs" radius="xs">
        <Group justify={"space-between"}>
          <Flex direction={"column"}>
            <Title order={2}>รายการที่ต้องจ่ายในวันนี้ 📅</Title>
            <Text>รายการที่ต้องจ่ายในวันนี้ทั้งหมด</Text>
          </Flex>
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
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Invoice</Table.Th>
                <Table.Th>Code</Table.Th>
                <Table.Th>customer name</Table.Th>
                <Table.Th>device name</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{
              installmentPayment?.map((payment) => {
                return (
                  <Table.Tr key={payment.id}>
                    <Table.Td>{payment.id}</Table.Td>
                    <Table.Td>{payment.installmentPayments?.code}</Table.Td>
                    <Table.Td>{payment.installmentPayments?.customerName}</Table.Td>
                    <Table.Td>
                      {payment.installmentPayments?.product.deviceName}
                    </Table.Td>
                    <Table.Td>
                      <Anchor
                        onClick={() =>
                          router.push(
                            `CMS/InstallmentPayments/${payment.id}`
                          )
                        }
                      >
                        ดำเนินการ
                      </Anchor>
                    </Table.Td>
                  </Table.Tr>
                )
              })
            }</Table.Tbody>
          </Table>
        </Table.ScrollContainer>
      </Paper>

      <Paper my={"md"} p={"md"} shadow="xs" radius="xs">
        <Group justify={"space-between"}>
          <Flex direction={"column"}>
            <Title order={2} c={"red"}>
              รายการที่เลยวันกำหนดจ่าย 📅
            </Title>
            <Text>รายการที่เลยวันกำหนดจ่ายไปแล้ว</Text>
          </Flex>
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
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Invoice</Table.Th>
                <Table.Th>Code</Table.Th>
                <Table.Th>customer name</Table.Th>
                <Table.Th>device name</Table.Th>
                <Table.Th></Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{
              overInstallmentPayment?.map((payment) => {
                return (
                  <Table.Tr key={payment.id}>
                    <Table.Td>{payment.id}</Table.Td>
                    <Table.Td>{payment.installmentPayments?.code}</Table.Td>
                    <Table.Td>{payment.installmentPayments?.customerName}</Table.Td>
                    <Table.Td>
                      {payment.installmentPayments?.product.deviceName}
                    </Table.Td>
                    <Table.Td>
                      <Anchor
                        onClick={() =>
                          router.push(
                            `CMS/InstallmentPayments/${payment.id}`
                          )
                        }
                      >
                        ดำเนินการ
                      </Anchor>
                    </Table.Td>
                  </Table.Tr>
                )
              })
            }</Table.Tbody>
          </Table>
        </Table.ScrollContainer>
      </Paper>
    </>
  );
}

export default CMS;
