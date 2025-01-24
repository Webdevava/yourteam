import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { verifyToken } from "@/lib/auth";
import { ObjectId } from "mongodb";

export async function POST(req) {
  try {
    const token = req.headers.get("Authorization")?.split(" ")[1];
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decodedToken = verifyToken(token);
    if (!decodedToken) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const { type, id } = await req.json();

    if (type !== "course" && type !== "project") {
      return NextResponse.json({ error: "Invalid type" }, { status: 400 });
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

    // Check if course/project exists and is allocated to user's college
    const item = await db
      .collection(type === "course" ? "courses" : "projects")
      .findOne({
        _id: new ObjectId(id),
        colleges: user.college,
      });

    if (!item) {
      return NextResponse.json(
        { error: `${type} not found or not allocated to your college` },
        { status: 404 }
      );
    }

    // Enroll user
    const updateField =
      type === "course" ? "enrolledCourses" : "enrolledProjects";
    await db
      .collection("users")
      .updateOne(
        { _id: user._id },
        { $addToSet: { [updateField]: new ObjectId(id) } }
      );

    return NextResponse.json({ message: `Enrolled in ${type} successfully` });
  } catch (error) {
    console.error("Enroll error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
