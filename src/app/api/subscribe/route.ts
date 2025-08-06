import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, botField = "JetLagNewsletter" } = await req.json();

    if (botField) {
      return NextResponse.json({ error: "Bot detected" }, { status: 400 });
    }

    if (!email) {
      return NextResponse.json({ error: "Missing email" }, { status: 400 });
    }

    const formId = process.env.KIT_SUBSCRIBE_FORM_ID;
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
