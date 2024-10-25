import { NextResponse } from "next/server";
import prismaClient from "../../../../libs/prisma";

export async function GET() {
  try {
    const findBranchs = await prismaClient.branch.findMany({
      include: {
        Products: true,
      },
    });

    if (!findBranchs)
      return NextResponse.json({ message: "มีบ้างอย่างผิดพลาด" });

    return NextResponse.json(findBranchs);
  } catch (e) {
    return NextResponse.json({ message: "error" }, { status: 500 });
  }
}
