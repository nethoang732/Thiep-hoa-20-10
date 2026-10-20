import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET(_request, { params }) {
  const id = params.id;
  if (!/^[0-9a-f-]{36}$/i.test(id)) return NextResponse.json({ error: "Mã thiệp không hợp lệ." }, { status: 400 });
  const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
  const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!redisUrl || !redisToken) return NextResponse.json({ error: "Nơi lưu thiệp chưa được cấu hình." }, { status: 503 });

  try {
    const response = await fetch(`${redisUrl.replace(/\/$/, "")}/get/${encodeURIComponent(`card:${id}`)}`, {
      headers: { Authorization: `Bearer ${redisToken}` }, cache: "no-store",
    });
    if (!response.ok) throw new Error("Storage unavailable");
    const result = await response.json();
    if (!result.result) return NextResponse.json({ error: "Thiệp không tồn tại hoặc đã hết hạn." }, { status: 404 });
    return NextResponse.json(JSON.parse(result.result), { headers: { "Cache-Control": "no-store" } });
  } catch {
    return NextResponse.json({ error: "Không thể mở thiệp lúc này." }, { status: 502 });
  }
}

