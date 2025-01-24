import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { verifyToken, hashPassword } from "@/lib/auth";

export async function POST(req) {
  try {
    const { token, newPassword } = await req.json();

    const decodedToken = verifyToken(token);
    if (!decodedToken) {
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db();

    // Find user
    const user = await db
      .collection("users")
      .findOne({ _id: decodedToken.userId });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Update password
    const hashedPassword = await hashPassword(newPassword);
    await db
      .collection("users")
      .updateOne({ _id: user._id }, { $set: { password: hashedPassword } });

    return NextResponse.json({ message: "Password reset successfully" });
  } catch (error) {
    console.error("Reset password error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
