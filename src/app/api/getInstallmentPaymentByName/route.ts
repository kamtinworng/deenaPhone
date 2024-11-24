import { NextRequest, NextResponse } from "next/server";
import prismaClient from "../../../../libs/prisma";

export async function GET(req: NextRequest) {
  try {
    const name = req.nextUrl.searchParams.get("name");

    const findInstallmentPayment =
      await prismaClient.installmentPayments.findMany({
        select: {
          customerName: true,
          code: true,
        },
        where: {
          customerName: {
            startsWith: !name ? undefined : name,
          },
        },
        take: 10,
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
