import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { verifyToken } from "@/lib/auth";
import { uploadToS3 } from "@/lib/s3";

async function checkAdminAuth(req) {
  const token = req.headers.get("Authorization")?.split(" ")[1];
  if (!token) {
    return false;
  }
  const decodedToken = verifyToken(token);
  if (!decodedToken || !decodedToken.isAdmin) {
    return false;
  }
  return true;
}

export async function GET(req) {
  try {
    if (!(await checkAdminAuth(req))) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const client = await clientPromise;
    const db = client.db();

    const courses = await db.collection("courses").find({}).toArray();

    return NextResponse.json(courses);
  } catch (error) {
    console.error("Error fetching courses:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    if (!(await checkAdminAuth(req))) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const title = formData.get("title");
    const difficulty = formData.get("difficulty");
    const duration = formData.get("duration");
    const description = formData.get("description");
    let colleges = formData.get("colleges");
    const thumbnail = formData.get("thumbnail");

    // Handle `colleges` field for both string and JSON array input
    try {
      if (colleges) {
        if (Array.isArray(colleges)) {
          // Already an array, do nothing
        } else if (typeof colleges === "string") {
          // If it's a single string, convert it into an array
          colleges = JSON.parse(colleges);
          if (!Array.isArray(colleges)) {
            colleges = [colleges];
          }
        } else {
          colleges = [];
        }
      } else {
        colleges = [];
      }
    } catch (e) {
      return NextResponse.json(
        { error: "Invalid colleges data" },
        { status: 400 }
      );
    }

    // Parse content safely
    const contentData = formData.get("content");
    const content = contentData ? JSON.parse(contentData) : [];

    // Upload thumbnail and content files to S3
    let thumbnailUrl = null;
    if (thumbnail && thumbnail instanceof File) {
      const thumbnailBuffer = Buffer.from(await thumbnail.arrayBuffer());
      thumbnailUrl = await uploadToS3(
        thumbnailBuffer,
        `courses/${title}/thumbnail-${Date.now()}`
      );
    }

    const contentUrls = await Promise.all(
      content.map(async (item, index) => {
        if (item.file && item.file instanceof File) {
          const fileBuffer = Buffer.from(await item.file.arrayBuffer());
          const fileUrl = await uploadToS3(
            fileBuffer,
            `courses/${title}/content-${index}-${Date.now()}`
          );
          return {
            type: item.type || "unknown",
            url: fileUrl,
          };
        }
        return null;
      })
    ).then((results) => results.filter((result) => result !== null));

    const client = await clientPromise;
    const db = client.db();

    const course = {
      title,
      difficulty,
      duration,
      description,
      colleges: colleges.map((id) => new ObjectId(id)), // Ensure `colleges` is an array of ObjectId
      thumbnail: thumbnailUrl,
      content: contentUrls,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await db.collection("courses").insertOne(course);

    return NextResponse.json(
      { success: true, courseId: result.insertedId },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding course:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}



export async function PUT(req) {
  try {
    if (!(await checkAdminAuth(req))) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const courseId = formData.get("_id");
    const title = formData.get("title");
    const difficulty = formData.get("difficulty");
    const duration = formData.get("duration");
    const description = formData.get("description");
    const colleges = JSON.parse(formData.get("colleges") || "[]");
    const thumbnail = formData.get("thumbnail");
    const content = JSON.parse(formData.get("content") || "[]");

    const client = await clientPromise;
    const db = client.db();

    const existingCourse = await db
      .collection("courses")
      .findOne({ _id: new ObjectId(courseId) });
    if (!existingCourse) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    // Upload new thumbnail if provided
    let thumbnailUrl = existingCourse.thumbnail;
    if (thumbnail) {
      let thumbnailBuffer;
      if (thumbnail instanceof Blob) {
        thumbnailBuffer = Buffer.from(await thumbnail.arrayBuffer());
      } else if (thumbnail instanceof ArrayBuffer) {
        thumbnailBuffer = Buffer.from(thumbnail);
      } else if (typeof thumbnail === "string") {
        // Assuming it's a base64 string
        thumbnailBuffer = Buffer.from(thumbnail.split(",")[1], "base64");
      } else {
        throw new Error("Unsupported thumbnail file type");
      }
      thumbnailUrl = await uploadToS3(
        thumbnailBuffer,
        `courses/${title}/thumbnail`
      );
    }

    // Upload new content files and keep existing ones
    const contentUrls = await Promise.all(
      content.map(async (item, index) => {
        let fileBuffer;
        if (item.file instanceof Blob) {
          fileBuffer = Buffer.from(await item.file.arrayBuffer());
        } else if (item.file instanceof ArrayBuffer) {
          fileBuffer = Buffer.from(item.file);
        } else if (typeof item.file === "string") {
          // Assuming it's a base64 string
          fileBuffer = Buffer.from(item.file.split(",")[1], "base64");
        } else {
          throw new Error(`Unsupported file type for content item ${index}`);
        }
        return {
          type: item.type,
          url: await uploadToS3(
            fileBuffer,
            `courses/${title}/content-${index}`
          ),
        };
      })
    );

    const updatedCourse = {
      title,
      difficulty,
      duration,
      description,
      colleges: colleges.map((id) => new ObjectId(id)),
      thumbnail: thumbnailUrl,
      content: contentUrls,
      updatedAt: new Date(),
    };

    await db
      .collection("courses")
      .updateOne({ _id: new ObjectId(courseId) }, { $set: updatedCourse });

    return NextResponse.json({
      success: true,
      message: "Course updated successfully",
    });
  } catch (error) {
    console.error("Error updating course:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  try {
    if (!(await checkAdminAuth(req))) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const courseId = searchParams.get("courseId");

    if (!courseId) {
      return NextResponse.json(
        { error: "Course ID is required" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db();

    const result = await db
      .collection("courses")
      .deleteOne({ _id: new ObjectId(courseId) });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Course deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting course:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
