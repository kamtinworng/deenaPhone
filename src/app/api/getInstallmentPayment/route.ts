import { NextRequest, NextResponse } from "next/server";
import prismaClient from "../../../../libs/prisma";

export async function GET(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get("id");
    if (!id) return NextResponse.json({ message: "มีบ้างอย่างผิดพลาด" });
    const findInstallmentPayment =
      await prismaClient.installmentPayments.findFirst({
        include: {
          product: {
            include: {
              branch: {
                select: {
                  name: true,
                },
              },
            },
          },
          dueDates: {
            select: {
              id: true,
              dueDate: true,
              paymentStatus: true,
              updatedAt: true,
              pricePaid: true,
            },
            orderBy: {
              dueDate: "asc",
            },
          },
          timeLineInstallmentPayment: {
            select: {
              id: true,
              createdAt: true,
              message: true,
              title: true,
              creatBy: {
                select: {
                  username: true,
                  image: true,
                },
              },
            },
          },
        },
        where: {
          id: id,
        },
      });

    findInstallmentPayment?.dueDates[0].paymentStatus;

    if (!findInstallmentPayment)
      return NextResponse.json({ message: "มีบ้างอย่างผิดพลาด" });

    return NextResponse.json(findInstallmentPayment);
  } catch (e) {
    return NextResponse.json({ message: "error" }, { status: 500 });
  }
}
