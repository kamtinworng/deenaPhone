import path from "node:path";
import { parse } from "csv-parse";
import * as fs from "fs";
import prismaClient from "../libs/prisma";

type BU = {
  ID_product: string;
  name_product: string | null;
  detail_product: string | null;
  total_product: string;
  star_product: string;
  price_product: string;
  month_product: string;
  icloud_product: string | null;
  password_icloud_product: string | null;
  unlock_phone: string | null;
  IDload_product: string | null;
  password_IDload_product: string | null;
  imei: string | null;
  image_product: string;
  status_product: string;
  date_product: string;
};

const initProduct = async () => {
  const csvFilePath = path.resolve("./files/tbl_product.csv");

  const fileContent = fs.readFileSync(csvFilePath, { encoding: "utf-8" });
  const headers = [
    "ID_product",
    "name_product",
    "detail_product",
    "total_product",
    "star_product",
    "price_product",
    "month_product",
    "icloud_product",
    "password_icloud_product",
    "unlock_phone",
    "IDload_product",
    "password_IDload_product",
    "imei",
    "image_product",
    "status_product",
    "date_product",
  ];
  try {
    parse(
      fileContent,
      {
        delimiter: ",",
        columns: headers,
      },
      async (error, result: BU[]) => {
        if (error) {
          console.error(error);
        }

        try {
          for (let i = 1; i < result.length; i++) {
            const product = result[i];

            console.log(product.ID_product);

            await prismaClient.products.create({
              data: {
                id: product.ID_product,
                deposit: parseInt(product.star_product as string),
                deviceDetail: product.detail_product ?? "",
                deviceName: product.name_product ?? "",
                indentifier: product.imei ?? "",
                installmentAmount: parseInt(product.price_product as string),
                numberOfInstallments: product.month_product,
                price: parseInt(product.total_product as string),
                branchId: "cm31ec90c0002uhbzcs9zzbwn",
                icloud: product.icloud_product,
                idLoad: product.IDload_product,
                images: [product.image_product],
                lockscreen: product.unlock_phone,
                passwordIcloud: product.password_icloud_product,
                passwordIdLoad: product.password_IDload_product,
                status:
                  product.status_product === "กำลังขาย" ? "ForSale" : "SoldOut",
                createAt: new Date(product.date_product),
              },
            });

            console.log(`finished ${i} from ${result.length}`);
          }

          console.log("Users created successfully");
        } catch (createUserError) {
          console.error("Error creating users", createUserError);
        }
      }
    );
  } catch (e) {
    console.error(e);
  }
};

initProduct();
