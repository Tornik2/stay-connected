import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export function middleware(request) {
  const cookieStore = cookies();
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
