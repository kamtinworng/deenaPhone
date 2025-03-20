'use server'
import prismaClient from "../../../../libs/prisma";

export async function GetDashboardValue(props: { code: string, year: string }) {
    try {
        const { code, year } = props

        // Parse year into date range
        const startOfYear = new Date(`${year}-01-01T00:00:00.000Z`);
        const endOfYear = new Date(`${year}-12-31T23:59:59.999Z`);

        // Query branches and products
        const findBranches = await prismaClient.branch.findMany({
            select: {
                code: true,
                Products: {
                    where: {
                        status: "SoldOut",
                        createAt: {
                            gte: startOfYear,
                            lte: endOfYear,
                        },
                    },
                    select: {
                        id: true,
                        price: true,
                        createAt: true,
                    },
                },
            },
            where: {
                code: !code ? undefined : code,
            },
        });

        if (!findBranches || findBranches.length === 0) {
            return { status: 400, data: null, message: "ไม่พบข้อมูล" }
        }

        // Process data into monthly aggregates
        const monthlyData = Array(12)
            .fill(null)
            .map((_, index) => ({
                month: index + 1,
                totalSales: 0,
                totalOrders: 0,
            }));

        findBranches.forEach((branch) => {
            branch.Products.forEach((product) => {
                const orderDate = new Date(product.createAt);
                const month = orderDate.getUTCMonth(); // Month is 0-indexed
                monthlyData[month].totalSales += product.price || 0;
                monthlyData[month].totalOrders += 1;
            });
        });

        return { status: 200, data: monthlyData, message: 'success' }
    } catch (e) {
        console.error("Error:", e);
        return { status: 500, message: e, data: null }
    }
}
