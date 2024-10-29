import { NextResponse } from "next/server";
import prismaClient from "../../../../libs/prisma";

export async function GET() {
  try {
    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0)); // Start of today
    const endOfDay = new Date(today.setHours(23, 59, 59, 999)); // End of today

    const findInstallmentPayment = await prismaClient.dueDates.findMany({
      select: {
        pricePaid: true,
        id: true,
        installmentPayments: {
          select: {
            id: true,
            code: true,
            customerName: true,
            product: {
              select: {
                deviceName: true,
              },
            },
          },
        },
      },
      where: {
        dueDate: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
    });

    if (!findInstallmentPayment)
      return NextResponse.json({
        status: 404,
        message: "ไม่มีรายการที่ต้องจ่าย",
      });

    return NextResponse.json({
      status: 200,
      findInstallmentPayment: findInstallmentPayment,
    });
  } catch (e) {
    return NextResponse.json({ message: "error" }, { status: 500 });
  }
}
