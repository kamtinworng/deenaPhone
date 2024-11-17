import path from "node:path";
import { parse } from "csv-parse";
import * as fs from "fs";
import prismaClient from "../libs/prisma";

type BU = {
  num: string;
  ID_relax: string;
  ID_product: string;
  total_price: string | null;
  relax_date: string | null;
  status: string | null;
  payment: string | null;
  name_customer: string | null;
  FaceBook_customer: string | null;
  tel_customer: string | null;
  filenameimei_image: string | null;
  filenameagreement: string | null;
  ID_card: string | null;
  image_cutmber: string | null;
  ID_house: string | null;
  month1: string | null;
  month2: string | null;
  month3: string | null;
  month4: string | null;
  month5: string | null;
  month6: string | null;
  month7: string | null;
  month8: string | null;
  month9: string | null;
  month10: string | null;
  month11: string | null;
  month12: string | null;
  status_month1: string | null;
  status_month2: string | null;
  status_month3: string | null;
  status_month4: string | null;
  status_month5: string | null;
  status_month6: string | null;
  status_month7: string | null;
  status_month8: string | null;
  status_month9: string | null;
  status_month10: string | null;
  status_month11: string | null;
  status_month12: string | null;
  note_month1: string | null;
  note_month2: string | null;
  note_month3: string | null;
  note_month4: string | null;
  note_month5: string | null;
  note_month6: string | null;
  note_month7: string | null;
  note_month8: string | null;
  note_month9: string | null;
  note_month10: string | null;
  note_month11: string | null;
  note_month12: string | null;
  price_month1: string;
  price_month2: string;
  price_month3: string;
  price_month4: string;
  price_month5: string;
  price_month6: string;
  price_month7: string;
  price_month8: string;
  price_month9: string;
  price_month10: string;
  price_month11: string;
  price_month12: string;
};

const initProduct = async () => {
  const csvFilePath = path.resolve("./files/tbl_relax.csv");

  const fileContent = fs.readFileSync(csvFilePath, { encoding: "utf-8" });
  const headers = [
    "num",
    "ID_relax",
    "ID_product",
    "total_price",
    "relax_date",
    "status",
    "payment",
    "name_customer",
    "FaceBook_customer",
    "tel_customer",
    "filenameimei_image",
    "filenameagreement",
    "ID_card",
    "image_cutmber",
    "ID_house",
    "month1",
    "month2",
    "month3",
    "month4",
    "month5",
    "month6",
    "month7",
    "month8",
    "month9",
    "month10",
    "month11",
    "month12",
    "status_month1",
    "status_month2",
    "status_month3",
    "status_month4",
    "status_month5",
    "status_month6",
    "status_month7",
    "status_month8",
    "status_month9",
    "status_month10",
    "status_month11",
    "status_month12",
    "note_month1",
    "note_month2",
    "note_month3",
    "note_month4",
    "note_month5",
    "note_month6",
    "note_month7",
    "note_month8",
    "note_month9",
    "note_month10",
    "note_month11",
    "note_month12",
    "price_month1",
    "price_month2",
    "price_month3",
    "price_month4",
    "price_month5",
    "price_month6",
    "price_month7",
    "price_month8",
    "price_month9",
    "price_month10",
    "price_month11",
    "price_month12",
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
            const customer = result[i];

            const codeCustomer = `old-`.concat(customer.ID_relax);

            const paid = [
              customer.price_month1,
              customer.price_month2,
              customer.price_month3,
              customer.price_month4,
              customer.price_month5,
              customer.price_month6,
              customer.price_month7,
              customer.price_month8,
              customer.price_month9,
              customer.price_month10,
              customer.price_month11,
              customer.price_month12,
            ];

            const allDate = [
              customer.month1,
              customer.month2,
              customer.month3,
              customer.month4,
              customer.month5,
              customer.month6,
              customer.month7,
              customer.month8,
              customer.month9,
              customer.month10,
              customer.month11,
              customer.month12,
            ];

            const filterDate = allDate.filter((f) => f !== "0000-00-00");

            console.log(filterDate);

            const countPaid = paid.filter((f) => f !== "0");

            const sumPaid = paid.reduce((a, b) => a + parseInt(b), 0);

            const remain = parseInt(customer.total_price as string) - sumPaid;

            await prismaClient.installmentPayments.create({
              data: {
                code: codeCustomer,
                customerName: customer.name_customer ?? "",
                customerReceivingImage: customer.image_cutmber ?? "",
                deviceImeiImageFile: customer.filenameimei_image ?? "",
                downPaymentChoice:
                  customer.payment === "เงินสด"
                    ? "cashPayment"
                    : "bankTransferPayment",
                facebookLink: customer.FaceBook_customer ?? "",
                houseRegistrationImage: customer.ID_house ?? "",
                icloudPhoneNumber: "",
                idCardImage: customer.ID_card ?? "",
                paidInstallments: countPaid.length,
                paymentAgreementFile: customer.filenameagreement ?? "",
                recipientId: "",
                remainingAmount: remain,
                screenId: "",
                tel: customer.tel_customer ?? "",
                timeCode: "",
                allIdReceiptImage: [],
                dueDates: {
                  create: filterDate.map((date, index) => {
                    return {
                      dueDate: new Date(date as string),
                      pricePaid: parseInt(paid[index] as string),
                      paymentStatus: paid[index] === "0" ? "pending" : "paid",
                    };
                  }),
                },
                productsId: customer.ID_product,
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
