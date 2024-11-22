import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import prismaClient from "../../../../libs/prisma";
import dayjs from "dayjs";

// GET method for webhook verification
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  if (mode === "subscribe" && token === process.env.VERIFY_TOKEN) {
    return new NextResponse(challenge, {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  } else {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }
}

// POST method for handling incoming messages
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const messagingEvents = body.entry?.[0]?.messaging || [];

    messagingEvents.forEach(
      async (event: { sender: { id: string }; message: { text: string } }) => {
        const senderId = event.sender.id;
        const messageText = event.message?.text;
        const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN_ATICHAR;

        const findBranch = await prismaClient.branch.findFirst({
          include: {
            chatBot: true,
          },
          where: {
            pageAccessToken: PAGE_ACCESS_TOKEN,
          },
        });

        console.log(messageText);

        const findInstallmentPayment =
          await prismaClient.installmentPayments.findFirst({
            select: {
              over: true,
              remainingAmount: true,
              paidInstallments: true,
              code: true,
              dueDates: true,
              product: {
                select: {
                  installmentAmount: true,
                  deviceName: true,
                  deviceDetail: true,
                  price: true,
                  deposit: true,
                  branch: {
                    select: {
                      chatBot: true,
                      pageAccessToken: true,
                    },
                  },
                },
              },
            },
            where: {
              recipientId: senderId,
            },
          });

        if (!event.message) return;

        if (
          messageText?.toLowerCase() === "ขอรหัส spid" ||
          messageText?.toLowerCase() === "spid"
        ) {
          sendTextMessage({
            senderId: senderId,
            answer: `your SPID : ${senderId}`,
            buttonLink: [],
            image: null,
            PAGE_ACCESS_TOKEN: PAGE_ACCESS_TOKEN ?? "",
          });
        }

        if (messageText?.toLowerCase() === "ติดตามการผ่อน") {
          if (!findInstallmentPayment)
            return sendTextMessage({
              senderId: senderId,
              answer: `ไม่พบรายการผ่อน`,
              buttonLink: [],
              image: null,
              PAGE_ACCESS_TOKEN: PAGE_ACCESS_TOKEN ?? "",
            });

          const paided = findInstallmentPayment
            ? findInstallmentPayment?.dueDates.reduce(
                (a, b) => a + (b.pricePaid || 0),
                0
              ) + findInstallmentPayment?.over
            : 0;
          sendTextMessage({
            senderId: senderId,
            answer: `
      ❤️ *Deena Code*: ${findInstallmentPayment?.code}

📱 **รายละเอียดสินค้า**:
    *ชื่อสินค้า*: ${findInstallmentPayment?.product.deviceName}
    *รายละเอียดสินค้า*: ${findInstallmentPayment?.product.deviceName}
    *ราคาสินค้า*: ${findInstallmentPayment?.product.price} บาท
    *ราคาดาว*: ${findInstallmentPayment?.product.deposit} บาท
------------------------------------------------

💳 **รายละเอียดการผ่อน**:
      ${findInstallmentPayment?.dueDates
        .map((due) => {
          return `
  📅 *วันที่*: ${dayjs(due.dueDate).format("DD-MM-YY")}
  🏷️ *สถานะ*: ${
    due.paymentStatus === "pending"
      ? "ยังไม่จ่าย"
      : due.paymentStatus === "paid"
      ? "จ่ายแล้ว"
      : "เลิกกำหนด"
  }
  💵 *ราคาต่องวด*: ${findInstallmentPayment.product.installmentAmount}
        `;
        })
        .join("\n")}
------------------------------------------------

📃**รายการจ่าย**:
    *จ่ายแล้ว*: ${paided}
    *คงเหลือ*: ${findInstallmentPayment?.remainingAmount}

  💸 **ต้องการดำเนินการจ่าย?** [คลิกที่นี่](${process.env.URL}Home/${
              findInstallmentPayment.code
            })
  หากมีข้อสงสัยเพิ่มเติม ติดต่อเราผ่านข้อความนี้ได้เลย!
    `,
            buttonLink: [],
            image: null,
            PAGE_ACCESS_TOKEN: PAGE_ACCESS_TOKEN ?? "",
          });
        }

        findBranch?.chatBot.map((chatbot) => {
          chatbot.keyword.map((key) => {
            if (messageText?.toLowerCase().includes(key.toLowerCase())) {
              sendTextMessage({
                answer: chatbot.answer,
                buttonLink: chatbot.buttonLink,
                image: chatbot.image,
                PAGE_ACCESS_TOKEN: findBranch.pageAccessToken,
                senderId: senderId,
              });
            }
          });

          if (messageText.toLowerCase() === chatbot.question.toLowerCase()) {
            sendTextMessage({
              answer: chatbot.answer,
              buttonLink: chatbot.buttonLink,
              image: chatbot.image,
              PAGE_ACCESS_TOKEN: findBranch.pageAccessToken,
              senderId: senderId,
            });
          }
        });
      }
    );

    return NextResponse.json({ message: "Received" }, { status: 200 });
  } catch (e) {
    console.error("Error processing request:", e);
    return NextResponse.json({ message: "error" }, { status: 500 });
  }
}

// Function to send a text message
function sendTextMessage(props: {
  senderId: string;
  answer: string;
  buttonLink: string[] | { type: string; url: string; title: string }[];
  image: string | null;
  PAGE_ACCESS_TOKEN: string | null;
}) {
  const messageData =
    props.buttonLink.length > 0
      ? {
          recipient: { id: props.senderId },
          message: {
            text: props.answer || "",
            quick_replies: props.buttonLink.map((button, index) => ({
              content_type: "text",
              title: button,
              payload: `INFO_PAYLOAD_${index}`, // Unique payload for each button
            })),
          },
        }
      : props.image
      ? {
          recipient: { id: props.senderId },
          message: {
            attachment: {
              type: "image",
              payload: {
                url: props.image, // URL of the image
                is_reusable: true,
              },
            },
          },
        }
      : {
          recipient: { id: props.senderId },
          message: {
            text: props.answer || "",
          },
        };

  axios
    .post(
      `https://graph.facebook.com/v12.0/me/messages?access_token=${props.PAGE_ACCESS_TOKEN}`,
      messageData
    )
    .catch((error) => {
      console.error(
        "Error sending message:",
        error.response ? error.response.data : error.message
      );
    });
}
