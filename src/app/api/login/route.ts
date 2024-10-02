import { NextRequest, NextResponse } from "next/server";
import prismaClient from "../../../../libs/prisma";
import { compare } from "bcrypt-ts";

export interface TYPELOGIN {
  username: string;
  password: string;
}

export async function POST(req: NextRequest) {
  try {
    const data: TYPELOGIN = await req.json();

    const findUser = await prismaClient.user.findFirst({
      where: {
        username: data.username,
      },
    });

    if (!findUser)
      return NextResponse.json({ message: "username หรือ password ผิด" });

    const checkPassword = await compare(data.password, findUser.password);

    if (!checkPassword)
      return NextResponse.json({ message: "username หรือ password ผิด" });

    return NextResponse.json({
      id: findUser.id,
      username: findUser.username,
      image: findUser.image,
      status: "ok",
    });
  } catch (e) {
    return NextResponse.json({ message: "error" }, { status: 500 });
  }
}
