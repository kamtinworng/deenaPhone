import { shop1 } from "../data";
import prismaClient from "../libs/prisma";

const initValue = () => {
    shop1.map(async (data) => {
        await prismaClient.installmentPayments.create({
            data: {
                ...data,
                dueDates: {
                    createMany: {
                        data: data.dueDates
                    }
                },
                downPaymentChoice: 'bankTransferPayment',
                product: {
                    create: { ...data.product, status: 'SoldOut' }
                }
            }
        })
    })

};

initValue();
