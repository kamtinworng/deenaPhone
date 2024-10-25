import { NextRequest, NextResponse } from "next/server";
import prismaClient from "../../../../libs/prisma";

export async function GET(req: NextRequest) {
  try {
    const productId = req.nextUrl.searchParams.get("productId");

    if (!productId) return NextResponse.json({ message: "มีบ้างอย่างผิดพลาด" });

    const findProduct = await prismaClient.products.findFirst({
      where: {
        id: productId as string,
      },
    });

    if (!findProduct)
      return NextResponse.json({ message: "มีบ้างอย่างผิดพลาด" });

    return NextResponse.json(findProduct);
  } catch (e) {
    return NextResponse.json({ message: "error" }, { status: 500 });
  }
}
