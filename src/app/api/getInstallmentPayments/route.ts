import { NextRequest, NextResponse } from "next/server";
import prismaClient from "../../../../libs/prisma";

export async function GET(req: NextRequest) {
  const search = req.nextUrl.searchParams.get("search");
  const name = req.nextUrl.searchParams.get("name");
  const page = req.nextUrl.searchParams.get("page");
  const TAKE = 10;

  try {
    const findInstallmentPayments =
      await prismaClient.installmentPayments.findMany({
        select: {
          id: true,
          code: true,
          product: {
            select: {
              deviceName: true,
              images: true,
              price: true,
              deviceDetail: true,
            },
          },
          customerName: true,
          facebookLink: true,
          tel: true,
          customerReceivingImage: true,
          statusInstallmentPayment: true,
          dueDates: {
            select: {
              paymentStatus: true,
            },
          },
        },
        where: {
          OR: [
            {
              code: {
                contains: !search ? undefined : search,
              },
              customerName: {
                contains: !name ? undefined : name
              }
            }
          ]

        },
        skip: !page ? 0 : parseInt(page) === 1 ? 0 : parseInt(page) + 1 * TAKE,
        take: TAKE,
      });

    const countFindInstallmentPayments =
      await prismaClient.installmentPayments.count({
        where: {
          code: {
            contains: !search ? undefined : search,
          },
        },
      });

    const countPagination = countFindInstallmentPayments / TAKE + 0.8;

    if (!findInstallmentPayments)
      return NextResponse.json({ message: "มีบ้างอย่างผิดพลาด" });

    return NextResponse.json({
      findInstallmentPayments: findInstallmentPayments,
      countFindInstallmentPayments: countPagination,
    });
  } catch (e) {
    return NextResponse.json({ message: "error" }, { status: 500 });
  }
}
