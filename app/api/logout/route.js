import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export function GET(request) {
  const cookieStore = cookies();
  cookieStore.delete("accessToken");
  cookieStore.delete("refreshToken");

  return NextResponse.redirect(new URL("/login", request.url));
}
