import { NextRequest, NextResponse } from "next/server";
import prismaClient from "../../../../libs/prisma";

export async function GET(req: NextRequest) {
  const search = req.nextUrl.searchParams.get("search");
  const branchCode = req.nextUrl.searchParams.get("branchCode");
  const page = req.nextUrl.searchParams.get("page");
  const limit = req.nextUrl.searchParams.get("limit");
  const TAKE = !limit ? 10 : parseInt(limit);

  try {
    const findProducts = await prismaClient.products.findMany({
      include: {
        branch: true,
      },
      where: {
        deviceName: {
          contains: !search ? undefined : search,
        },
        branch: {
          code: {
            equals: !branchCode ? undefined : branchCode,
          },
        },
      },
      skip: !page ? 0 : parseInt(page) === 1 ? 0 : parseInt(page) + 1 * TAKE,
      take: TAKE,
      orderBy: {
        createAt: "desc",
      },
    });

    const countFindProducts = await prismaClient.products.count({
      where: {
        deviceName: {
          contains: !search ? undefined : search,
        },
      },
    });

    const countPagination = countFindProducts / TAKE + 0.8;

    if (!findProducts)
      return NextResponse.json({ message: "มีบ้างอย่างผิดพลาด" });

    return NextResponse.json({
      findProducts: findProducts,
      countfindProducts: countPagination,
    });
  } catch (e) {
    return NextResponse.json({ message: "error" }, { status: 500 });
  }
}
