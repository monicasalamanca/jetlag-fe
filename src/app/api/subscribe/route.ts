import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, botField, tag = "JetLagNewsletter" } = await req.json();

  if (botField) {
    return NextResponse.json({ error: "Bot detected" }, { status: 400 });
  }

  if (!email) {
    return NextResponse.json({ error: "Missing email" }, { status: 400 });
  }

  const res = await fetch(
    `https://api.convertkit.com/v3/forms/${process.env.KIT_FORM_ID}/subscribe`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        api_key: process.env.KIT_API_KEY,
        email,
        tags: [tag],
      }),
    },
  );

  const data = await res.json();

  if (!res.ok) {
    return NextResponse.json(
      { error: data.message || "Subscription failed" },
      { status: res.status },
    );
  }

  return NextResponse.json({ success: true, message: "Subscribed!" });
}
