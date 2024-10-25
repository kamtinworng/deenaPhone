export interface TYPEINSTALLMENTPAYMENT {
  id: string;
  code: string;
  productsId: string;
  paidInstallments: number;
  remainingAmount: number;
  createdAt: Date;
  customerName: string;
  facebookLink: string;
  tel: string;
  downPaymentChoice: "cashPayment" | "bankTransferPayment";
  statusInstallmentPayment: "inProgress" | "Hold" | "Cancel" | "Success";
  paymentAgreementFile: string;
  deviceImeiImageFile: string;
  idCardImage: string;
  houseRegistrationImage: string;
  customerReceivingImage: string;
  over: number;
  product: {
    id: string;
    images: string[];
    deviceName: string;
    deviceDetail: string;
    indentifier: string; // IEMI or serial
    price: number; // ราคาเต็ม
    deposit: number; // เงินดาวน์
    numberOfInstallments: string; // จำนวนงวด
    installmentAmount: number; // จำนวนเงินต่อครั้งที่ผ่อนชำระ
    icloud: string | null;
    passwordIcloud: string | null;
    lockscreen: string | null;
    idLoad: string | null;
    passwordIdLoad: string | null;
    status: "ForSale" | "SoldOut";
    branchId: string;
    branch: {
      name: string;
    };
  };
  dueDates: {
    id: string;
    dueDate: Date;
    paymentStatus: "pending" | "paid" | "overdue";
    updatedAt: Date;
    receiptImage: string;
    pricePaid: number;
  }[];
  timeLineInstallmentPayment: {
    id: string;
    createdAt: Date;
    message: string;
    title: string;
    creatBy: {
      username: string;
      image: string;
    };
  }[];
}
