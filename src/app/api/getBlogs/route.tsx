import { NextRequest, NextResponse } from "next/server";
import prismaClient from "../../../../libs/prisma";

export async function GET(req: NextRequest) {
  try {
    const search = req.nextUrl.searchParams.get("search");
    const page = req.nextUrl.searchParams.get("page");
    const limit = req.nextUrl.searchParams.get("limit");
    const TAKE = !limit ? 10 : parseInt(limit as string);

    const findBlogs = await prismaClient.blog.findMany({
      where: {
        title: {
          contains: !search ? undefined : search,
        },
      },
      skip: !page ? 0 : parseInt(page) === 1 ? 0 : parseInt(page) + 1 * TAKE,
      take: TAKE,
    });

    if (!findBlogs) return NextResponse.json({ message: "มีบ้างอย่างผิดพลาด" });
    const countFindBlogs = await prismaClient.blog.count({
      where: {
        title: {
          contains: !search ? undefined : search,
        },
      },
    });

    const countPagination = countFindBlogs / TAKE + 0.8;

    return NextResponse.json({
      findBlogs: findBlogs,
      countPagination: countPagination,
    });
  } catch (e) {
    return NextResponse.json({ message: "error" }, { status: 500 });
  }
}
