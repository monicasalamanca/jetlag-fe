import { NextRequest, NextResponse } from "next/server";

const SITE_URL = "https://thejetlagchronicles.com";
const MIN_SUBMIT_MS = 2000;
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;

// NOTE: This store is per-instance and resets on serverless cold starts.
// Swap for @vercel/kv or @upstash/ratelimit for persistent, multi-instance rate limiting.
const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

function getClientIp(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    req.headers.get("x-real-ip") ??
    "unknown"
  );
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitStore.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitStore.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }
  if (entry.count >= RATE_LIMIT_MAX) return false;
  entry.count++;
  return true;
}

export interface BotCheckInput {
  botField: string;
  timestamp: number;
  recaptchaToken?: string;
}

export async function checkBotProtection(
  req: NextRequest,
  { botField, timestamp, recaptchaToken }: BotCheckInput,
): Promise<NextResponse | null> {
  if (botField) {
    return NextResponse.json({ error: "Bot detected" }, { status: 400 });
  }

  if (
    typeof timestamp !== "number" ||
    timestamp <= 0 ||
    Date.now() - timestamp < MIN_SUBMIT_MS
  ) {
    return NextResponse.json({ error: "Bot detected" }, { status: 400 });
  }

  const isDev = process.env.NODE_ENV === "development";
  const origin = req.headers.get("origin") ?? "";
  const referer = req.headers.get("referer") ?? "";
  const isLocalhost = (s: string) =>
    s.startsWith("http://localhost") || s.startsWith("http://127.0.0.1");
  const originOk = origin === SITE_URL || (isDev && isLocalhost(origin));
  const refererOk =
    referer.startsWith(SITE_URL) || (isDev && isLocalhost(referer));

  if (!originOk && !refererOk) {
    return NextResponse.json({ error: "Bot detected" }, { status: 400 });
  }

  const ip = getClientIp(req);
  if (!checkRateLimit(ip)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  if (secretKey) {
    if (!recaptchaToken) {
      return NextResponse.json({ error: "Bot detected" }, { status: 400 });
    }
    const verifyRes = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `secret=${encodeURIComponent(secretKey)}&response=${encodeURIComponent(recaptchaToken)}`,
      },
    );
    const verifyData: { success: boolean; score: number } =
      await verifyRes.json();
    if (!verifyData.success || verifyData.score < 0.5) {
      return NextResponse.json({ error: "Bot detected" }, { status: 400 });
    }
  }

  return null;
}
