"use client";

import { AreaChart, LineChart } from "@mantine/charts";
import { Card, Flex, Select, Title } from "@mantine/core";
import { YearPickerInput } from "@mantine/dates";
import { IconCalendar } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { GetBranchs } from "../Branches/loader";
import { notifications } from "@mantine/notifications";
import { GetDashboardValue } from "./loader";
function Page() {
  const [value, setValue] = useState<Date | null>(new Date());
  const [brand, setBrand] = useState<string>("");
  const [values, setValues] = useState<
    {
      month: number;
      totalSales: number;
      totalOrders: number;
    }[] | undefined
  >()

  const [brands, setBrands] = useState<{
    name: string;
    code: string;
  }[]>();

  useEffect(() => {
    const fetchData = async () => {
      const res = await GetBranchs();
      const resDashBoard = await GetDashboardValue({ code: brand, year: value!.getFullYear().toString() });

      if (res.status !== 200) {
        notifications.show({
          message: res.message,
          color: "red",
        });
      }
      if (resDashBoard.status !== 200) {
        notifications.show({
          message: '', // ตรงนี้คุณใช้ res.message ผิด น่าจะเป็น resDashBoard.message
          color: "red",
        });
      }

      setValues(resDashBoard.data ?? []);
      setBrands(res.data);
    };

    fetchData();
  }, [brand, value]); // เพิ่ม brand และ value เข้าไป


  const monthNames = [
    "มกราคม",
    "กุมภาพันธ์",
    "มีนาคม",
    "เมษายน",
    "พฤษภาคม",
    "มิถุนายน",
    "กรกฎาคม",
    "สิงหาคม",
    "กันยายน",
    "ตุลาคม",
    "พฤศจิกายน",
    "ธันวาคม",
  ];
  const data = values?.map((value) => {
    return {
      date: monthNames[value.month - 1],
      ยอดขาย: value.totalSales,
    };
  });

  const dataOrder = values?.map((value) => {
    return {
      date: monthNames[value.month - 1],
      ยอดOrder: value.totalOrders,
    };
  });

  return (
    <>
      <Flex justify="space-between" align="center" my={"md"} wrap="nowrap">
        <Select
          label="เลือกสาขาที่ต้องการดูยอดขาย"
          placeholder="ทั้งหมด"
          value={brand}
          onChange={(e) => setBrand(e ?? "")}
          data={brands?.map((brand) => {
            return {
              label: brand.name,
              value: brand.code,
            };
          })}
        />
        <YearPickerInput
          label="เลือกปีที่ต้องการดู"
          placeholder="Pick year"
          value={value}
          locale="th"
          onChange={setValue}
          leftSection={<IconCalendar size={14} />}
        />
      </Flex>
      <Card shadow="sm">
        <Title order={4} my={"md"}>
          ยอด order
        </Title>
        <AreaChart
          h={300}
          data={dataOrder ?? []}
          dataKey="date"
          series={[{ name: "ยอดOrder", color: "brand" }]}
          curveType="linear"
        />
        <Title order={4} my={"md"}>
          ยอดขาย
        </Title>

        <LineChart
          h={300}
          data={data ?? []}
          dataKey="date"
          series={[{ name: "ยอดขาย", color: "brand" }]}
          curveType="linear"
        />
      </Card>
    </>
  );
}

export default Page;
