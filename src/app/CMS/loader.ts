'use server'

import prismaClient from "../../../libs/prisma";

const GetInstallmentPayment = async () => {
    try {
        const today = new Date();
        const startOfDay = new Date(today.setHours(0, 0, 0, 0)); // Start of today
        const endOfDay = new Date(today.setHours(23, 59, 59, 999)); // End of today

        const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1); // First day of the month
        const endOfMonth = new Date(
            today.getFullYear(),
            today.getMonth() + 1,
            0,
            23,
            59,
            59,
            999
        ); // Last day of the month

        const findInstallmentPaymentMonth = await prismaClient.dueDates.findMany({
            select: {
                pricePaid: true,
                id: true,
                installmentPayments: {
                    select: {
                        id: true,
                        code: true,
                        customerName: true,
                        product: {
                            select: {
                                deviceName: true,
                            },
                        },
                    },
                },
            },
            where: {
                OR: [
                    {
                        paymentStatus: "overdue",
                    },
                    {
                        paymentStatus: "pending",
                    },
                ],
                dueDate: {
                    gte: startOfMonth,
                    lte: endOfMonth,
                },
            },
        });

        const findInstallmentPayment = await prismaClient.dueDates.findMany({
            select: {
                pricePaid: true,
                id: true,
                installmentPayments: {
                    select: {
                        id: true,
                        code: true,
                        customerName: true,
                        product: {
                            select: {
                                deviceName: true,
                            },
                        },
                    },
                },
            },
            where: {
                dueDate: {
                    gte: startOfDay,
                    lte: endOfDay,
                },
            },
        });


        if (findInstallmentPaymentMonth) {
            if (findInstallmentPayment) {
                return {
                    status: 200,
                    message: 'success',
                    data: {
                        findInstallmentPayment: findInstallmentPayment,
                        findInstallmentPaymentMonth: findInstallmentPaymentMonth
                    },
                }
            } else {
                return {
                    status: 200,
                    message: 'success',
                    data: {
                        findInstallmentPayment: [],
                        findInstallmentPaymentMonth: findInstallmentPaymentMonth
                    },
                }
            }
        } else {
            return {
                status: 200,
                message: 'success',
                data: {
                    findInstallmentPayment: [],
                    findInstallmentPaymentMonth: []
                },
            }
        }

    } catch (e) {
        return {
            status: 500,
            message: '',
            data: null
        }
    }
}

export default GetInstallmentPayment