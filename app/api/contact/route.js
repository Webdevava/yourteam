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

export async function POST(req) {
  try {
    const { name, email, phone, courseInterested } = await req.json();

    const client = await clientPromise;
    const db = client.db();

    // Add contact form submission
    await db.collection("contactForms").insertOne({
      name,
      email,
      phone,
      courseInterested,
      dateSubmitted: new Date(),
    });

    return NextResponse.json(
      { message: "Contact form submitted successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Contact form submission error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  try {
    if (!(await checkAdminAuth(req))) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const client = await clientPromise;
    const db = client.db();

    const contactForms = await db
      .collection("contactForms")
      .find({})
      .sort({ dateSubmitted: -1 })
      .toArray();

    return NextResponse.json(contactForms);
  } catch (error) {
    console.error("Error fetching contact forms:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

