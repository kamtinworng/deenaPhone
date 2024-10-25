import { NextRequest, NextResponse } from "next/server";
import prismaClient from "../../../../libs/prisma";
import { createCommand, createUrlS3 } from "../../../../libs/createUrlS3";
import { s3 } from "../../../../libs/S3";

export interface TYPEBLOG {
  typeBlog: "news" | "promotion";
  blogTitle: string;
  blogDetail: string;
  image: string;
}

export async function POST(req: NextRequest) {
  const data: TYPEBLOG = await req.json();
  const command = await createCommand(data.image);
  await s3.send(command);
  const url = !command ? null : createUrlS3(command.input.Key!);
  try {
    const createBlog = await prismaClient.blog.create({
      data: {
        image: url ?? "",
        detail: data.blogDetail,
        title: data.blogTitle,
        typeBlog: data.typeBlog,
      },
    });

    return NextResponse.json(
      { createUser: createBlog, status: "ok" },
      { status: 200 }
    );
  } catch (e) {
    return NextResponse.json({ message: "error" }, { status: 500 });
  }
}
