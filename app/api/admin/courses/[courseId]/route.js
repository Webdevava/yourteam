import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { verifyToken } from "@/lib/auth";
import { uploadToS3 } from "@/lib/s3";
import { ObjectId } from "mongodb";

export async function PUT(req, { params }) {
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

    const { courseId } = params;
    const {
      title,
      difficulty,
      duration,
      description,
      colleges,
      thumbnail,
      content,
    } = await req.json();

    let updateData = {
      title,
      difficulty,
      duration,
      description,
      colleges,
    };

    if (thumbnail) {
      const thumbnailUrl = await uploadToS3(
        thumbnail,
        `courses/${title}-thumbnail`
      );
      updateData.thumbnail = thumbnailUrl;
    }

    if (content) {
      const uploadedContent = await Promise.all(
        content.map(async (item) => {
          const fileUrl = await uploadToS3(
            item.file,
            `courses/${title}-${item.type}`
          );
          return { type: item.type, url: fileUrl };
        })
      );
      updateData.content = uploadedContent;
    }

    const result = await db
      .collection("courses")
      .updateOne({ _id: new ObjectId(courseId) }, { $set: updateData });

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Course updated successfully" });
  } catch (error) {
    console.error("Update course error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
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

    const { courseId } = params;

    const result = await db
      .collection("courses")
      .deleteOne({ _id: new ObjectId(courseId) });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    // Remove course from all users' enrolledCourses
    await db
      .collection("users")
      .updateMany(
        { enrolledCourses: new ObjectId(courseId) },
        { $pull: { enrolledCourses: new ObjectId(courseId) } }
      );

    return NextResponse.json({ message: "Course deleted successfully" });
  } catch (error) {
    console.error("Delete course error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
