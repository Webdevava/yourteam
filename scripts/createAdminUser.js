import dotenv from "dotenv";
dotenv.config();

import clientPromise from "../lib/mongodb.js";
import { hashPassword } from "../lib/auth.js";

async function createAdminUser() {
  try {
    const client = await clientPromise;
    const db = client.db();

    const adminEmail = "ankurauti@gmail.com";
    const adminPassword = "Ankur@382";

    // Check if admin user already exists
    const existingAdmin = await db
      .collection("users")
      .findOne({ email: adminEmail });
    if (existingAdmin) {
      console.log("Admin user already exists");
      return;
    }

    // Create admin user
    const hashedPassword = await hashPassword(adminPassword);
    await db.collection("users").insertOne({
      name: "Admin",
      email: adminEmail,
      password: hashedPassword,
      isAdmin: true,
      dob: new Date(),
      college: "Admin College",
      contactNumber: "1234567890",
      enrolledCourses: [],
      enrolledProjects: [],
    });

    console.log("Admin user created successfully");
  } catch (error) {
    console.error("Error creating admin user:", error);
  }
}

createAdminUser();
