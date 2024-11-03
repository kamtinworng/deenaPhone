import { NextResponse } from "next/server";
import prismaClient from "../../../../libs/prisma";
import axios from "axios";

export async function GET() {
  try {
    const today = new Date();
    const startOfYesterday = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - 1,
      0,
      0,
      0,
      0
    ); // Start of yesterday

    const findInstallmentPayment = await prismaClient.dueDates.findMany({
      select: {
        id: true,
        installmentPayments: {
          select: {
            recipientId: true,
            code: true,
            product: {
              select: {
                branch: {
                  select: {
                    pageAccessToken: true,
                  },
                },
              },
            },
          },
        },
      },
      where: {
        paymentStatus: "pending",
        dueDate: {
          lt: startOfYesterday, // Less than the start of yesterday
        },
      },
    });

    if (findInstallmentPayment) {
      findInstallmentPayment.map(async (payment) => {
        await prismaClient.dueDates.update({
          data: {
            paymentStatus: "overdue",
          },
          where: {
            id: payment.id,
          },
        });
        // const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;

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
      });
    }
    return NextResponse.json({
      findInstallmentPayment: findInstallmentPayment.length,
      status: 200,
    });
  } catch (e) {
    return NextResponse.json({ message: "error" }, { status: 500 });
  }
}
