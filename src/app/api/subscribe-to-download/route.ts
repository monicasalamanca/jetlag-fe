import { NextRequest, NextResponse } from "next/server";
import { checkBotProtection } from "../bot-protection";

export async function POST(req: NextRequest) {
  try {
    const {
      email,
      botField = "",
      timestamp = 0,
      recaptchaToken,
    } = await req.json();

    const botCheck = await checkBotProtection(req, {
      botField,
      timestamp,
      recaptchaToken,
    });
    if (botCheck) return botCheck;

    if (!email) {
      return NextResponse.json({ error: "Missing email" }, { status: 400 });
    }

    const formId = process.env.KIT_THAILAND_GUIDE_FORM_ID;
    if (!formId) {
      return NextResponse.json(
        { error: "Form ID not configured" },
        { status: 500 },
      );
    }

    const apiKey = process.env.KIT_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "API key not configured" },
        { status: 500 },
      );
    }

    await fetch("https://api.kit.com/v4/subscribers", {
      method: "POST",
      headers: {
        "X-Kit-Api-Key": apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email_address: email,
      }),
    });

    await fetch(`https://api.kit.com/v4/forms/${formId}/subscribers`, {
      method: "POST",
      headers: {
        "X-Kit-Api-Key": apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email_address: email,
        referrer: "https://thejetlagchronicles.com/subscribe",
      }),
    });

    return NextResponse.json({ success: true, message: "Subscribed!" });
  } catch (error) {
    return NextResponse.json(
      { error: `Internal server error: ${error}` },
      { status: 500 },
    );
  }
}
