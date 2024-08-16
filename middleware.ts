import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const res = NextResponse.next();

  const cookies = req.cookies.get("sessionID");

  if (!cookies) {
    res.cookies.set("sessionID", crypto.randomUUID());
  }

  return res;
}
