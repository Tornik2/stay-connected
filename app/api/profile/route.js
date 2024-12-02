import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(request) {
  try {
    const cookieStore = await cookies();
    const accessToken = await cookieStore.get("accessToken")?.value; // accessToken
    if (!accessToken) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    const response = await fetch(
      "https://h5ck35.pythonanywhere.com/api/profiles/my-profile/",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch profile" },
        { status: response.status }
      );
    }
    const profile = await response.json();
    return NextResponse.json(profile);
  } catch (error) {
    console.error("Error fetching profile:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
