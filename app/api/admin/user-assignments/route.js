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

    const client = await clientPromise;
    const db = client.db();

    // Check if user is admin
    const admin = await db
      .collection("users")
      .findOne({ _id: new ObjectId(decodedToken.userId), isAdmin: true });
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { userId, itemId, itemType } = await req.json();

    if (!userId || !itemId || !itemType) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (itemType !== "course" && itemType !== "project") {
      return NextResponse.json({ error: "Invalid item type" }, { status: 400 });
    }

    const updateField =
      itemType === "course" ? "enrolledCourses" : "enrolledProjects";

    const result = await db
      .collection("users")
      .updateOne(
        { _id: new ObjectId(userId) },
        { $addToSet: { [updateField]: new ObjectId(itemId) } }
      );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ message: `${itemType} assigned successfully` });
  } catch (error) {
    console.error("Assign item error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
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

    // Check if user is admin
    const admin = await db
      .collection("users")
      .findOne({ _id: new ObjectId(decodedToken.userId), isAdmin: true });
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    const itemId = searchParams.get("itemId");
    const itemType = searchParams.get("itemType");

    if (!userId || !itemId || !itemType) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (itemType !== "course" && itemType !== "project") {
      return NextResponse.json({ error: "Invalid item type" }, { status: 400 });
    }

    const updateField =
      itemType === "course" ? "enrolledCourses" : "enrolledProjects";

    const result = await db
      .collection("users")
      .updateOne(
        { _id: new ObjectId(userId) },
        { $pull: { [updateField]: new ObjectId(itemId) } }
      );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ message: `${itemType} removed successfully` });
  } catch (error) {
    console.error("Remove item error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
