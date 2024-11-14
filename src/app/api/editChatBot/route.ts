import { NextRequest, NextResponse } from "next/server";
import prismaClient from "../../../../libs/prisma";
import { createCommand, createUrlS3 } from "../../../../libs/createUrlS3";
import { s3 } from "../../../../libs/S3";

export interface TYPEPROUDCT {
  branchId: string;
  title: string;
  question: string;
  answer: string;
  image: string | null;
  buttonLink: string[] | [];
  keyword: string[] | [];
  chatBotId: string;
}

export async function PUT(req: NextRequest) {
  try {
    const data: TYPEPROUDCT = await req.json();

    const findChatBot = await prismaClient.chatBot.findFirst({
      select: {
        image: true,
      },
      where: {
        id: data.chatBotId,
      },
    });

    let url = null;

    if (!findChatBot)
      return NextResponse.json(
        { message: "ไม่เจอ find chat bot" },
        { status: 400 }
      );

    if (data.image === findChatBot.image) {
      url = findChatBot.image;
    } else if (data.image) {
      const command = await createCommand(data.image);
      await s3.send(command);
      url = createUrlS3(command.input.Key!);
    }

    const createChatbot = await prismaClient.chatBot.update({
      where: {
        id: data.chatBotId,
      },
      data: {
        answer: data.answer,
        question: data.question,
        title: data.title,
        branchId: data.branchId,
        buttonLink: data.buttonLink,
        image: url,
        keyword: data.keyword,
      },
    });

    if (createChatbot)
      return NextResponse.json({ status: "ok" }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ message: "error" }, { status: 500 });
  }
}
