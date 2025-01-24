import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { verifyToken } from "@/lib/auth";

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


export async function DELETE(req, { params }) {
  try {
    // Uncomment and implement admin auth check if needed
    if (!(await checkAdminAuth(req))) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = params;

    const client = await clientPromise;
    const db = client.db();

    const result = await db.collection("contactForms").deleteOne({
      _id: new ObjectId(id),
    });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: "Contact request not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Contact request deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting contact form:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
