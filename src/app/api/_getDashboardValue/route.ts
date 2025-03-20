import { NextRequest, NextResponse } from "next/server";
import prismaClient from "../../../../libs/prisma";

export async function GET(req: NextRequest) {
  try {
    const code = req.nextUrl.searchParams.get("code");
    const year = req.nextUrl.searchParams.get("year") || "2024"; // Default to 2024 if not provided

    // Parse year into date range
    const startOfYear = new Date(`${year}-01-01T00:00:00.000Z`);
    const endOfYear = new Date(`${year}-12-31T23:59:59.999Z`);

    // Query branches and products
    const findBranches = await prismaClient.branch.findMany({
      select: {
        code: true,
        Products: {
          where: {
            status: "SoldOut",
            createAt: {
              gte: startOfYear,
              lte: endOfYear,
            },
          },
          select: {
            id: true,
            price: true,
            createAt: true,
          },
        },
      },
      where: {
        code: !code ? undefined : code,
      },
    });

    if (!findBranches || findBranches.length === 0) {
      return NextResponse.json({ message: "ไม่พบข้อมูล" });
    }

    // Process data into monthly aggregates
    const monthlyData = Array(12)
      .fill(null)
      .map((_, index) => ({
        month: index + 1,
        totalSales: 0,
        totalOrders: 0,
      }));

    findBranches.forEach((branch) => {
      branch.Products.forEach((product) => {
        const orderDate = new Date(product.createAt);
        const month = orderDate.getUTCMonth(); // Month is 0-indexed
        monthlyData[month].totalSales += product.price || 0;
        monthlyData[month].totalOrders += 1;
      });
    });

    return NextResponse.json(monthlyData);
  } catch (e) {
    console.error("Error:", e);
    return NextResponse.json({ message: "เกิดข้อผิดพลาด" }, { status: 500 });
  }
}
