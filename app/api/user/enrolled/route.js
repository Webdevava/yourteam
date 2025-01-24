import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { verifyToken } from "@/lib/auth";
import { ObjectId } from "mongodb";

export async function GET(req) {
  try {
    const token = req.headers.get("Authorization")?.split(" ")[1];
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decodedToken = verifyToken(token);
    if (!decodedToken) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const client = await clientPromise;
    const db = client.db();

    // Get user
    const user = await db
      .collection("users")
      .findOne({ _id: new ObjectId(decodedToken.userId) });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Get enrolled courses and projects
    const enrolledCourses = await db
      .collection("courses")
      .find({
        _id: { $in: user.enrolledCourses },
      })
      .toArray();

    const enrolledProjects = await db
      .collection("projects")
      .find({
        _id: { $in: user.enrolledProjects },
      })
      .toArray();

    return NextResponse.json({ enrolledCourses, enrolledProjects });
  } catch (error) {
    console.error("Get enrolled items error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
