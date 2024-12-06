import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(request) {
  const cookieStore = await cookies();
  await cookieStore.delete("accessToken");
  await cookieStore.delete("refreshToken");

  return NextResponse.redirect(new URL("/login", request.url));
}
