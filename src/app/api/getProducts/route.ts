import { NextResponse } from "next/server";
import prismaClient from "../../../../libs/prisma";

export async function GET() {
  try {
    const findProducts = await prismaClient.products.findMany({});

    if (!findProducts)
      return NextResponse.json({ message: "มีบ้างอย่างผิดพลาด" });

    return NextResponse.json(findProducts);
  } catch (e) {
    return NextResponse.json({ message: "error" }, { status: 500 });
  }
}
