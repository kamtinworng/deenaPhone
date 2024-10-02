import { NextRequest, NextResponse } from "next/server";
import prismaClient from "../../../../libs/prisma";
import bcrypt from "bcrypt";

export interface TYPEREGISTER {
  username: string;
  password: string;
  image: string | null;
}

export async function POST(req: NextRequest) {
  try {
    const data: TYPEREGISTER = await req.json();

    const findDuplicateUser = await prismaClient.user.findFirst({
      where: {
        username: data.username,
      },
    });

    if (findDuplicateUser)
      return NextResponse.json({ message: "username ซ้ำ" });

    const hashPassword = await bcrypt.hash(data.password, 10);

    const createUser = await prismaClient.user.create({
      data: {
        username: data.username,
        password: hashPassword,
      },
    });

    if (createUser) return NextResponse.json(createUser, { status: 200 });
  } catch (e) {
    return NextResponse.json({ message: "error" }, { status: 500 });
  }
}
