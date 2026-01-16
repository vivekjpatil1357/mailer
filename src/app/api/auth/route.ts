import { type NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";

const JWT_SECRET = process.env.JWT_SECRET || "your-super-secret-key";

export async function POST(req: NextRequest) {
  const { password } = await req.json();
  if (password === process.env.PAGE_PASSWORD) {
    const token = jwt.sign({ authenticated: true }, JWT_SECRET, {
      expiresIn: "1h",
    });

    const cookie = serialize("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: 3600, // 1 hour
      path: "/",
    });

    const response = NextResponse.json({ message: "Authentication successful" });
    response.headers.set("Set-Cookie", cookie);
    return response;
  } else {
    return NextResponse.json({ message: "Invalid password" }, { status: 401 });
  }
}
