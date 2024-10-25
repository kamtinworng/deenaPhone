import { NextRequest, NextResponse } from "next/server";
import prismaClient from "../../../../libs/prisma";

export async function GET(req: NextRequest) {
  try {
    const code = req.nextUrl.searchParams.get("code");

    if (!code) return NextResponse.json({ message: "มีบ้างอย่างผิดพลาด" });

    const findBranch = await prismaClient.branch.findFirst({
      where: {
        code: code as string,
      },
    });

    if (!findBranch)
      return NextResponse.json({ message: "มีบ้างอย่างผิดพลาด" });

    return NextResponse.json(findBranch);
  } catch (e) {
    return NextResponse.json({ message: "error" }, { status: 500 });
  }
}
