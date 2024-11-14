import { NextRequest, NextResponse } from "next/server";
import prismaClient from "../../../../libs/prisma";

export async function GET(req: NextRequest) {
  try {
    const chatBotId = req.nextUrl.searchParams.get("chatBotId");

    if (!chatBotId) return NextResponse.json({ message: "มีบ้างอย่างผิดพลาด" });

    const findBranch = await prismaClient.chatBot.findFirst({
      where: {
        id: chatBotId as string,
      },
    });

    if (!findBranch)
      return NextResponse.json({ message: "มีบ้างอย่างผิดพลาด" });

    return NextResponse.json(findBranch);
  } catch (e) {
    return NextResponse.json({ message: "error" }, { status: 500 });
  }
}
