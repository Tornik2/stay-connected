import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function middleware(request) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  // If no access token, redirect to the login page
  if (!accessToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

// Protected Routes
export const config = {
  matcher: ["/", "/questions"],
};
