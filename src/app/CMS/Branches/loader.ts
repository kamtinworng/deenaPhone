'use server'
import prismaClient from "../../../../libs/prisma";

export async function GetBranchs() {
    try {
        const findBranchs = await prismaClient.branch.findMany({
            select: {
                chatBot: true,
                _count: {
                    select: {
                        Products: true
                    }
                },
                name: true,
                code: true,
                id: true,
                profileImage: true,
            },
        });
        if (!findBranchs)
            return { status: 400, data: [], message: "มีบ้างอย่างผิดพลาด" }

        return { status: 200, data: findBranchs, message: 'success' }
    } catch (e) {
        return { status: 500, data: [], message: "มีบ้างอย่างผิดพลาด" }
    }
}
