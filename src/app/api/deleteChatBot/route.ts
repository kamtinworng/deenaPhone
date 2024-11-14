import { NextRequest, NextResponse } from "next/server";
import prismaClient from "../../../../libs/prisma";

export async function DELETE(req: NextRequest) {
  try {
    const chatBotId = req.nextUrl.searchParams.get("chatBotId");

    if (!chatBotId) return NextResponse.json({ message: "มีบ้างอย่างผิดพลาด" });

    const deleteChatBot = await prismaClient.chatBot.delete({
      where: {
        id: chatBotId as string,
      },
    });

    if (!deleteChatBot)
      return NextResponse.json({ message: "มีบ้างอย่างผิดพลาด" });

    return NextResponse.json({ status: "ok" }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ message: "error" }, { status: 500 });
  }
}
