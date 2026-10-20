import { NextResponse } from "next/server";
import { randomUUID } from "node:crypto";

export const runtime = "nodejs";

export async function POST(request) {
  const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
  const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!redisUrl || !redisToken) {
    return NextResponse.json({ error: "Thiệp có lời chúc dài cần cấu hình nơi lưu trữ Upstash Redis." }, { status: 503 });
  }

  let body;
  try { body = await request.json(); } catch { return NextResponse.json({ error: "Dữ liệu thiệp không hợp lệ." }, { status: 400 }); }
  if (typeof body?.wish !== "string" || body.wish.length > 600) {
    return NextResponse.json({ error: "Lời chúc cần có nội dung và tối đa 600 ký tự." }, { status: 400 });
  }

  const id = randomUUID();
  const value = JSON.stringify({ wish: body.wish, to: String(body.to || "Bạn").slice(0, 40), from: String(body.from || "").slice(0, 40) });
  try {
    const endpoint = `${redisUrl.replace(/\/$/, "")}/set/${encodeURIComponent(`card:${id}`)}/${encodeURIComponent(value)}?EX=2592000`;
    const response = await fetch(endpoint, { method: "POST", headers: { Authorization: `Bearer ${redisToken}` }, cache: "no-store" });
    if (!response.ok) throw new Error("Storage unavailable");
    return NextResponse.json({ id }, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return NextResponse.json({ error: "Thiệp chưa thể lưu lúc này. Thử lại sau một lát." }, { status: 502 });
  }
}

