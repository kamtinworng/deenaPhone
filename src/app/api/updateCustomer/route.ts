import { NextRequest, NextResponse } from "next/server";
import prismaClient from "../../../../libs/prisma";

export interface TYPEUPDATECUSTOMER {
  idInstallmentPayments: string;
  customerName: string;
  facebookLink: string;
  tel: string;
  SPID: string;
}

export async function POST(req: NextRequest) {
  try {
    const data: TYPEUPDATECUSTOMER = await req.json();

    if (!data.idInstallmentPayments)
      return NextResponse.json({ message: "ไม่มี id ที่ส่งมาแก้ไข" });

    const updateCustomer = await prismaClient.installmentPayments.update({
      data: {
        customerName: data.customerName,
        facebookLink: data.facebookLink,
        tel: data.tel,
        recipientId: data.SPID,
      },
      where: {
        id: data.idInstallmentPayments,
      },
    });
    if (updateCustomer)
      return NextResponse.json(
        { status: "ok", message: "แก้ไขข้อมูลสำเร็จ" },
        { status: 200 }
      );
  } catch (e) {
    return NextResponse.json({ message: e }, { status: 500 });
  }
}
