'use server'

import axios from "axios";
import prismaClient from "../../../libs/prisma";


let lastRunDate: string | null = null; // เก็บวันที่ล่าสุดที่รัน

export const sendMessage = async () => {
    try {
        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth();

        const firstDay = new Date(year, month, 1).toISOString().split('T')[0]; // YYYY-MM-DD
        const midDay = new Date(year, month, 15).toISOString().split('T')[0];
        const lastDay = new Date(year, month + 1, 0).toISOString().split('T')[0];

        const startOfMonth = new Date(year, month, 1);
        const endOfMonth = new Date(year, month + 1, 1);

        const todayString = today.toISOString().split('T')[0];
        if (lastRunDate === todayString) {
            console.log("Already ran today.");
            return { status: 200, message: "Already ran today", data: null };
        }

        if (![firstDay, midDay, lastDay,].includes(todayString)) {
            console.log("Not a scheduled day.");
            return { status: 200, message: "Not a scheduled day", data: null };
        }

        lastRunDate = todayString;


        const findInstallmentPayment = await prismaClient.dueDates.findMany({
            select: {
                pricePaid: true,
                id: true,
                installmentPayments: {
                    select: {
                        id: true,
                        code: true,
                        customerName: true,
                        recipientId: true,
                        product: {
                            select: {
                                branch: {
                                    select: {
                                        pageAccessToken: true
                                    }
                                },
                                deviceName: true,
                            },
                        },
                    },
                },
            },
            where: {
                paymentStatus: 'pending',
                dueDate: {
                    gte: startOfMonth,
                    lt: endOfMonth,
                },
                id: 'cm85fmwhr0004q9b552usjwzn'
            },
        });

        findInstallmentPayment.map((payment) => {
            const text = `ขอเรียนให้ทราบว่า ขณะนี้ท่านได้เกินกำหนดวันชำระเงินค่างวดสำหรับสินค้าที่ท่านได้ผ่อนชำระแล้ว กรุณาดำเนินการชำระค่างวดสินค้าของท่านโดยเร็วที่สุด ท่านสามารถดำเนินการชำระเงินผ่านลิงค์นี้: ${process.env.URL}Home/${payment.installmentPayments?.code}`;
            const messageData = {
                recipient: { id: payment.installmentPayments?.recipientId },
                message: { text: text || "" },
            };

            axios
                .post(
                    `https://graph.facebook.com/v12.0/me/messages?access_token=${payment.installmentPayments?.product.branch.pageAccessToken}`,
                    messageData
                )
                .then((response) => {
                    console.log("Message sent successfully", response.data);
                })
                .catch((error) => {
                    console.error(
                        "Error sending message:",
                        error.response ? error.response.data : error.message
                    );
                });
        })



        return { status: 200, message: "Success", data: findInstallmentPayment };

    } catch (e) {
        return { status: 500, message: e, data: null }
    }
}
