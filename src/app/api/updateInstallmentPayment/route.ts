import { NextRequest, NextResponse } from "next/server";
import prismaClient from "../../../../libs/prisma";
import { createCommand, createUrlS3 } from "../../../../libs/createUrlS3";
import { s3 } from "../../../../libs/S3";

export interface TYPEREGISTER {
  idInstallmentPayments: string;
  receiptImages: {
    base64: string;
    amount: number;
    id: string;
  }[];
  userId: string;
}

export async function POST(req: NextRequest) {
  try {
    const data: TYPEREGISTER = await req.json();

    const findInstallmentPayment =
      await prismaClient.installmentPayments.findFirst({
        include: {
          dueDates: {
            orderBy: {
              dueDate: "asc",
            },
          },
          product: true,
        },
        where: {
          id: data.idInstallmentPayments,
        },
      });

    if (!findInstallmentPayment)
      return NextResponse.json({ message: "มีบ้างอย่างผิดพลาด" });

    const dueDates = findInstallmentPayment.dueDates.filter(
      (f: { paymentStatus: "pending" | "paid" | "overdue" }) =>
        f.paymentStatus !== "paid"
    );

    const newImage = [];
    const allId = [];
    let currentAmount = 0;
    let amountTimeline = 0;

    let oldOver = findInstallmentPayment.over;

    for (let i = 0; i < data.receiptImages.length; i++) {
      currentAmount += data.receiptImages[i].amount + oldOver;
      amountTimeline += data.receiptImages[i].amount;
      const command = await createCommand(data.receiptImages[i].base64);
      await s3.send(command);
      const url = !command ? null : createUrlS3(command.input.Key!);
      newImage.push(url);
      allId.push(data.receiptImages[i].id);
      oldOver = 0;
    }

    const divisor = findInstallmentPayment.product.installmentAmount;

    const times = Math.floor(currentAmount / divisor); // จำนวนครั้งที่หารลงตัว
    const remainder = currentAmount % divisor; // เศษที่เหลือ

    const updateInstallmentPayments =
      await prismaClient.installmentPayments.update({
        data: {
          receiptImage: {
            push: newImage.map((image) => image ?? ""),
          },
          allIdReceiptImage: {
            push: allId,
          },
          over: remainder,
          remainingAmount:
            findInstallmentPayment.remainingAmount - currentAmount,
        },
        where: {
          id: data.idInstallmentPayments,
        },
      });

    if (updateInstallmentPayments) {
      Array(times)
        .fill(0)
        .map(async (due, index) => {
          return await prismaClient.dueDates.update({
            data: {
              pricePaid: findInstallmentPayment.product.installmentAmount,
              paymentStatus: "paid",
              updatedAt: new Date(),
            },
            where: {
              id: dueDates[index].id,
            },
          });
        });

      await prismaClient.timeLineInstallmentPayment.create({
        data: {
          installmentPaymentsId: updateInstallmentPayments.id,
          message: `ดำเนินการจ่ายค่างวดจำนวน ${amountTimeline} บาท`,
          title: "จ่ายค่างวด",
          userId: data.userId === "" ? null : data.userId,
        },
      });
    }

    if (updateInstallmentPayments)
      return NextResponse.json({ status: "ok" }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ message: e }, { status: 500 });
  }
}
