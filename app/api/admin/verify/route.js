import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";

export async function GET(req) {
  try {
    const token = req.headers.get("Authorization")?.split(" ")[1];
    if (!token) {
      return NextResponse.json(
        { isAdmin: false, error: "No token provided" },
        { status: 401 }
      );
    }

    const decodedToken = verifyToken(token);
    if (!decodedToken) {
      return NextResponse.json(
        { isAdmin: false, error: "Invalid token" },
        { status: 401 }
      );
    }

    console.log("Decoded token in verify endpoint:", decodedToken);

    // The isAdmin status is now directly available in the decoded token
    return NextResponse.json({ isAdmin: decodedToken.isAdmin });
  } catch (error) {
    console.error("Error verifying admin status:", error);
    return NextResponse.json(
      { isAdmin: false, error: error.message },
      { status: 500 }
    );
  }
}
