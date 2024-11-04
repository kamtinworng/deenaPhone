import { NextRequest, NextResponse } from "next/server";
import prismaClient from "../../../../libs/prisma";
import { s3 } from "../../../../libs/S3";
import { createCommand, createUrlS3 } from "../../../../libs/createUrlS3";
// import prismaClient from "../../../../libs/prisma";
// import { createCommand, createUrlS3 } from "../../../../libs/createUrlS3";
// import { s3 } from "../../../../libs/S3";

export interface TYPEINPUT {
  customerName: string;
  facebookLink: string;
  tel: string;
  dueDate: Date;
  recipientId: string;
  screenId: string;
  timeCode: string;
  icloudPhoneNumber: string;
  downPaymentChoice: "cashPayment" | "bankTransferPayment";
  paymentAgreementFile: string;
  deviceImeiImageFile: string;
  idCardImage: string;
  houseRegistrationImage: string;
  customerReceivingImage: string;
  productId: string;
  userId: string;
}

export async function POST(req: NextRequest) {
  try {
    const data: TYPEINPUT = await req.json();

    const product = await prismaClient.products.findFirst({
      where: {
        id: data.productId,
      },
    });

    if (!product) {
      return NextResponse.json({ message: "ไม่พบสินค้า" }, { status: 400 });
    }

    const createS3 = async (image: string) => {
      const command = await createCommand(image);
      await s3.send(command);
      const url = createUrlS3(command.input.Key!);

      return url;
    };

    const paymentAgreementFileS3 = await createS3(data.paymentAgreementFile);
    const deviceImeiImageFileS3 = await createS3(data.deviceImeiImageFile);
    const idCardImageS3 = await createS3(data.idCardImage);
    const houseRegistrationImageS3 = await createS3(
      data.houseRegistrationImage
    );
    const customerReceivingImageS3 = await createS3(
      data.customerReceivingImage
    );

    const dueDates = Array(parseInt(product.numberOfInstallments as string))
      .fill(0)
      .map((_, index) => {
        const currentDate = new Date(data.dueDate);
        currentDate.setMonth(currentDate.getMonth() + index + 1);

        return currentDate;
      });

    const lastCode = await prismaClient.installmentPayments.findFirst({
      select: {
        code: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 1,
    });

    const silpCode = !lastCode ? 0 : lastCode?.code.split("deena");

    const newCode = !lastCode
      ? "deena1"
      : !silpCode
      ? "deena1"
      : "deena".concat((parseInt(silpCode[1] as string) + 1).toString());

    const createInstallmentPayment =
      await prismaClient.installmentPayments.create({
        data: {
          code: newCode,
          customerName: data.customerName,
          customerReceivingImage: customerReceivingImageS3,
          deviceImeiImageFile: deviceImeiImageFileS3,
          downPaymentChoice: data.downPaymentChoice,
          facebookLink: data.facebookLink,
          houseRegistrationImage: houseRegistrationImageS3,
          idCardImage: idCardImageS3,
          paidInstallments: 0,
          paymentAgreementFile: paymentAgreementFileS3,
          remainingAmount: product.price,
          recipientId: data.recipientId,
          icloudPhoneNumber: data.icloudPhoneNumber,
          screenId: data.screenId,
          timeCode: data.timeCode,
          tel: data.tel,
          productsId: product.id,
          over: 0,

          dueDates: {
            create: dueDates.map((date) => {
              return {
                pricePaid: 0,
                dueDate: date,
              };
            }),
          },
          timeLineInstallmentPayment: {
            create: {
              title: "เริ่มต้นการผ่อนชำระ",
              message: "เริ่มต้นดำเนินการผ่อนชำระ",
              userId: data.userId,
            },
          },
        },
      });

    if (createInstallmentPayment) {
      await prismaClient.products.update({
        data: {
          status: "SoldOut",
        },
        where: {
          id: product.id,
        },
      });
      return NextResponse.json(
        {
          message: "ดำเนินการเพิ่มลงระบบสำเร็จ",
          id: createInstallmentPayment.id,
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: "มีบ้างอย่างผิดพลาด" },
        { status: 400 }
      );
    }

    return NextResponse.json("");
  } catch (e) {
    return NextResponse.json({ message: e }, { status: 500 });
  }
}
