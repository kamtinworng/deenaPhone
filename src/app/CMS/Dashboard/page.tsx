"use client";
import { AreaChart, LineChart } from "@mantine/charts";
import { Card, Flex, Select, Title } from "@mantine/core";
import { YearPickerInput } from "@mantine/dates";
import { useFetch } from "@mantine/hooks";
import { IconCalendar } from "@tabler/icons-react";
import { useState } from "react";
function Page() {
  const [value, setValue] = useState<Date | null>(new Date());
  const [brand, setBrand] = useState<string>("");

  const { data: brands } = useFetch<
    {
      name: string;
      code: string;
    }[]
  >(`${process.env.NEXT_PUBLIC_NEXT_API}/getBrands`);

  const { data: values } = useFetch<
    {
      month: number;
      totalSales: number;
      totalOrders: number;
    }[]
  >(
    `${
      process.env.NEXT_PUBLIC_NEXT_API
    }/getDashboardValue?code=${brand}&year=${value?.getFullYear()}`
  );

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
