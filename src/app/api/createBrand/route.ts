import { NextRequest, NextResponse } from "next/server";
import prismaClient from "../../../../libs/prisma";
import { createCommand, createUrlS3 } from "../../../../libs/createUrlS3";
import { s3 } from "../../../../libs/S3";

export interface TYPEREGISTER {
  code: string;
  name: string;
  profileImage: string;
}

export async function POST(req: NextRequest) {
  try {
    const data: TYPEREGISTER = await req.json();

    const findDuplicateUser = await prismaClient.branch.findFirst({
      where: {
        code: data.code,
      },
    });

    if (findDuplicateUser) return NextResponse.json({ message: "code ซ้ำ" });

    const command = await createCommand(data.profileImage);
    await s3.send(command);
    const url = !command ? null : createUrlS3(command.input.Key!);

    const createUser = await prismaClient.branch.create({
      data: {
        code: data.code,
        name: data.name,
        profileImage: url,
      },
    });

    if (createUser) return NextResponse.json(createUser, { status: 200 });
  } catch (e) {
    return NextResponse.json({ message: "error" }, { status: 500 });
  }
}
