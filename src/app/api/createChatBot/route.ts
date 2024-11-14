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
}

export async function POST(req: NextRequest) {
  try {
    const data: TYPEPROUDCT = await req.json();

    let url = null;

    if (data.image) {
      const command = await createCommand(data.image);
      await s3.send(command);
      url = createUrlS3(command.input.Key!);
    }

    const createChatbot = await prismaClient.chatBot.create({
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
