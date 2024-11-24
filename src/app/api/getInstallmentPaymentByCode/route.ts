import { NextRequest, NextResponse } from "next/server";
import prismaClient from "../../../../libs/prisma";

export async function GET(req: NextRequest) {
  try {
    const code = req.nextUrl.searchParams.get("code");
    console.log(code);

    if (!code) return NextResponse.json({ message: "มีบ้างอย่างผิดพลาด" });

    const findInstallmentPayment =
      await prismaClient.installmentPayments.findFirst({
        include: {
          dueDates: true,
          product: {
            include: {
              branch: true,
              installmentPayments: true,
            },
          },
          timeLineInstallmentPayment: {
            include: {
              creatBy: true,
            },
          },
        },
        where: {
          code: code as string,
        },
      });

    if (!findInstallmentPayment)
      return NextResponse.json({ message: "ไม่พบรหัสดังกล่าว", status: 404 });

    return NextResponse.json({
      findInstallmentPayment: findInstallmentPayment,
      status: 200,
    });
  } catch (e) {
    return NextResponse.json({ message: "error" }, { status: 500 });
  }
}
