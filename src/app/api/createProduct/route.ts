import { NextRequest, NextResponse } from "next/server";
import prismaClient from "../../../../libs/prisma";
import { createCommand, createUrlS3 } from "../../../../libs/createUrlS3";
import { s3 } from "../../../../libs/S3";

export interface TYPEPROUDCT {
  brandCode: string;
  productName: string;
  deviceDetail: string;
  price: number;
  deposit: number;
  numberOfInstallments: number;
  installmentAmount: number;
  Icloud: string;
  passwordIclound: string;
  lockscreen: string;
  idLoad: string;
  passwordIdLoad: string;
  imei: string;
  images: string[];
}

export async function POST(req: NextRequest) {
  try {
    const data: TYPEPROUDCT = await req.json();

    const promiseS3s = data.images.map(async (image) => {
      const command = await createCommand(image);
      await s3.send(command);
      const url = createUrlS3(command.input.Key!);
      return url;
    });

    const S3s = await Promise.all(promiseS3s);

    const createProduct = await prismaClient.products.create({
      data: {
        deviceName: data.productName,
        deviceDetail: data.deviceDetail,
        indentifier: data.imei,
        price: data.price,
        deposit: data.deposit,
        installmentAmount: data.installmentAmount,
        numberOfInstallments: data.numberOfInstallments.toString(),
        icloud: data.Icloud,
        passwordIcloud: data.passwordIclound,
        lockscreen: data.lockscreen,
        idLoad: data.idLoad,
        passwordIdLoad: data.passwordIdLoad,
        branchId: data.brandCode,
        images: S3s,
      },
    });

    if (createProduct) return NextResponse.json(createProduct, { status: 200 });
  } catch (e) {
    return NextResponse.json({ message: "error" }, { status: 500 });
  }
}
