import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN,
});

export async function GET() {
  try {
    const logins = await redis.lrange("logins", 0, -1);
    const parsed = logins.map((entry) =>
      typeof entry === "string" ? JSON.parse(entry) : entry
    );
    return NextResponse.json({ success: true, logins: parsed });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
