import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

// GET method for webhook verification
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  if (mode === "subscribe" && token === process.env.VERIFY_TOKEN) {
    console.log("WEBHOOK_VERIFIED");
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
      (event: { sender: { id: string }; message: { text: string } }) => {
        const senderId = event.sender.id;
        const messageText = event.message?.text;

        if (!event.message) return;

        if (messageText === "ขอรหัส SPID") {
          sendTextMessage(senderId, `your SPID : ${senderId}`);
        }
      }
    );

    return NextResponse.json({ message: "Received" }, { status: 200 });
  } catch (e) {
    console.error("Error processing request:", e);
    return NextResponse.json({ message: "error" }, { status: 500 });
  }
}

// Function to send a text message
function sendTextMessage(senderId: string, text: string) {
  const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;

  const messageData = {
    recipient: { id: senderId },
    message: { text: text || "" },
  };

  axios
    .post(
      `https://graph.facebook.com/v12.0/me/messages?access_token=${PAGE_ACCESS_TOKEN}`,
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
}
