import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { verifyToken } from "@/lib/auth";
import { ObjectId } from "mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();

    // Get colleges
    const colleges = await db.collection("colleges").find().toArray();

    return NextResponse.json(colleges);
  } catch (error) {
    console.error("Get colleges error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

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

    const { name } = await req.json();

    if (!name) {
      return NextResponse.json(
        { error: "College name is required" },
        { status: 400 }
      );
    }

    // Check for duplicate college
    const existingCollege = await db
      .collection("colleges")
      .findOne({ name: name });
    if (existingCollege) {
      return NextResponse.json(
        { error: "College with this name already exists" },
        { status: 409 }
      );
    }

    const result = await db.collection("colleges").insertOne({
      name,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return NextResponse.json(
      { success: true, collegeId: result.insertedId },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding college:", error);
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
    const collegeId = searchParams.get("collegeId");

    if (!collegeId) {
      return NextResponse.json(
        { error: "College ID is required" },
        { status: 400 }
      );
    }

    const result = await db
      .collection("colleges")
      .deleteOne({ _id: new ObjectId(collegeId) });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "College not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "College deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting college:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
