import { NextResponse } from "next/server";

const INDEXNOW_KEY =
  process.env.INDEXNOW_KEY ?? "8bef1ffed828560095d67ae64fa1ef13";
const INDEXNOW_WEBHOOK_SECRET = process.env.INDEXNOW_WEBHOOK_SECRET;
const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://thejetlagchronicles.com";
const INDEXNOW_API = "https://api.indexnow.org/IndexNow";

type StrapiEntry = {
  slug?: string;
  lifestyle?: boolean;
  country?: { slug?: string } | null;
};

type StrapiWebhookBody = {
  event?: string;
  model?: string;
  entry?: StrapiEntry;
};

function resolveUrl(model: string, entry: StrapiEntry): string | null {
  const { slug, lifestyle, country } = entry;
  if (!slug) return null;

  switch (model) {
    case "country":
      return `${BASE_URL}/${slug}`;
    case "blog":
      if (lifestyle) return `${BASE_URL}/lifestyle/${slug}`;
      if (country?.slug) return `${BASE_URL}/${country.slug}/${slug}`;
      return null;
    case "guide":
      return `${BASE_URL}/guides/${slug}`;
    default:
      return null;
  }
}

// Called by Strapi webhooks (entry.publish / entry.update events).
// Auth: set header x-webhook-secret = INDEXNOW_WEBHOOK_SECRET env var.
export async function POST(req: Request) {
  try {
    const secret = req.headers.get("x-webhook-secret");
    if (INDEXNOW_WEBHOOK_SECRET && secret !== INDEXNOW_WEBHOOK_SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body: StrapiWebhookBody = await req.json().catch(() => ({}));
    const { model, entry } = body;

    const url = model && entry ? resolveUrl(model, entry) : null;

    const urls = url ? [url] : [BASE_URL];

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
      console.error(
        "[INDEXNOW] Submission failed",
        res.status,
        await res.text(),
      );
      return NextResponse.json(
        { error: "IndexNow submission failed", status: res.status },
        { status: 502 },
      );
    }

    console.log("[INDEXNOW] Submitted:", urls);
    return NextResponse.json({ ok: true, submitted: urls });
  } catch (err) {
    console.error("[INDEXNOW] Error", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
