import { NextResponse } from "next/server";

export async function POST(req) {
  const { email, password } = await req.json();

  try {
    const response = await fetch("http://164.90.165.135/api/token/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Login failed" },
        { status: response.status }
      );
    }

    // Extract the token and user data from the backend response
    const { access, refresh } = await response.json();

    // Create the response and set the token as an HttpOnly cookie
    const nextResponse = NextResponse.json({
      message: "Login successful",
      accessToken: access,
      refreshToken: refresh,
    });
    nextResponse.cookies.set("access_token", access, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict", // Prevent CSRF  F?
      maxAge: 24 * 60 * 60,
      path: "/",
    });

    return nextResponse;
  } catch (error) {
    console.error("Error during login:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
