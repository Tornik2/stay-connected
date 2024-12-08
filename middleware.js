import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  console.log(pathname);
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;
  // If no access token, redirect to the login page
  if (!accessToken && pathname !== "/login" && pathname !== "/register") {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  // if already logged in redirect from /login or /register to /questions
  if (accessToken && (pathname === "/login" || pathname === "/register")) {
    return NextResponse.redirect(new URL("/questions", request.url));
  }

  return NextResponse.next();
}

// Protected Routes
export const config = {
  matcher: ["/", "/questions", "/login", "/register"],
};
