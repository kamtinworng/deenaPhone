import { NextResponse } from "next/server";
import prismaClient from "../../../../libs/prisma";

export async function GET() {
  try {
    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1); // First day of the month
    const endOfMonth = new Date(
      today.getFullYear(),
      today.getMonth() + 1,
      0,
      23,
      59,
      59,
      999
    ); // Last day of the month

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
        OR: [
          {
            paymentStatus: "overdue",
          },
          {
            paymentStatus: "pending",
          },
        ],
        dueDate: {
          gte: startOfMonth,
          lte: endOfMonth,
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
