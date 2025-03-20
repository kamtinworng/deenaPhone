'use server'
import prismaClient from "../../../../libs/prisma";

export async function GetBlogs(props: { search: string, page: number }) {
    try {
        const { search, page } = props
        const TAKE = 10;

        const findBlogs = await prismaClient.blog.findMany({
            where: {
                title: {
                    contains: !search ? undefined : search,
                },
            },
            skip: !page ? 0 : page === 1 ? 0 : page + 1 * TAKE,
            take: TAKE,
        });

        if (!findBlogs) return { status: 400, data: null, message: "มีบ้างอย่างผิดพลาด" }



        const countFindBlogs = await prismaClient.blog.count({
            where: {
                title: {
                    contains: !search ? undefined : search,
                },
            },
        });

        const countPagination = countFindBlogs / TAKE + 0.8;

        return {
            status: 200,
            data: {
                findBlogs: findBlogs,
                countPagination: countPagination,
            },
            message: 'success'
        }
    } catch (e) {
        return { status: 500, data: null, message: "error" }
    }
}
