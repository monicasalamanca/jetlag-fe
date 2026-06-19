import { NextResponse } from "next/server";

const INDEXNOW_KEY = process.env.INDEXNOW_KEY ?? "8bef1ffed828560095d67ae64fa1ef13";
const INDEXNOW_WEBHOOK_SECRET = process.env.INDEXNOW_WEBHOOK_SECRET;
const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://thejetlagchronicles.com";
const INDEXNOW_API = "https://api.indexnow.org/IndexNow";

// Called by Strapi webhooks when content is published or updated.
// Body: { secret?: string; urls?: string[] }
// If no URLs provided, submits homepage as a fallback ping.
export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));

    if (INDEXNOW_WEBHOOK_SECRET && body.secret !== INDEXNOW_WEBHOOK_SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const urls: string[] =
      Array.isArray(body.urls) && body.urls.length > 0
        ? body.urls
        : [BASE_URL];

    const host = new URL(BASE_URL).hostname;

    const payload = {
      host,
      key: INDEXNOW_KEY,
      keyLocation: `${BASE_URL}/${INDEXNOW_KEY}.txt`,
      urlList: urls,
    };

    const res = await fetch(INDEXNOW_API, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      console.error("[INDEXNOW] Submission failed", res.status, await res.text());
      return NextResponse.json(
        { error: "IndexNow submission failed", status: res.status },
        { status: 502 },
      );
    }

    console.log("[INDEXNOW] Submitted", urls.length, "URL(s)");
    return NextResponse.json({ ok: true, submitted: urls.length });
  } catch (err) {
    console.error("[INDEXNOW] Error", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
