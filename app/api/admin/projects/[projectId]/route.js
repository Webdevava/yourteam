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

    const { projectId } = params;
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
        `projects/${title}-thumbnail`
      );
      updateData.thumbnail = thumbnailUrl;
    }

    if (content) {
      const uploadedContent = await Promise.all(
        content.map(async (item) => {
          const fileUrl = await uploadToS3(
            item.file,
            `projects/${title}-${item.type}`
          );
          return { type: item.type, url: fileUrl };
        })
      );
      updateData.content = uploadedContent;
    }

    const result = await db
      .collection("projects")
      .updateOne({ _id: new ObjectId(projectId) }, { $set: updateData });

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Project updated successfully" });
  } catch (error) {
    console.error("Update project error:", error);
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
    const admin = await db.collection("users").findOne({
      _id: new ObjectId(decodedToken.userId),
      isAdmin: true,
    });
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { projectId } = params;

    const result = await db
      .collection("projects")
      .deleteOne({ _id: new ObjectId(projectId) });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    // Remove project from all users' enrolledProjects
    await db
      .collection("users")
      .updateMany(
        { enrolledProjects: new ObjectId(projectId) },
        { $pull: { enrolledProjects: new ObjectId(projectId) } }
      );

    return NextResponse.json({ message: "Project deleted successfully" });
  } catch (error) {
    console.error("Delete project error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
