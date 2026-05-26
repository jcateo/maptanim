import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as schema from "../drizzle/schema";
import * as dotenv from "dotenv";
import bcrypt from "bcryptjs";

dotenv.config();

async function addUsers() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not set");
  }

  const connection = await mysql.createConnection(process.env.DATABASE_URL);
  const db = drizzle(connection, { schema, mode: 'default' });

  console.log("Adding admin and extension officer accounts...");

  try {
    const passwordHash = await bcrypt.hash("password123", 10);

    // Add Admin
    await db.insert(schema.users).values({
      email: "admin@maptanim.com",
      passwordHash: passwordHash,
      name: "MapTanim Admin",
      role: "admin",
    });

    // Add Extension Officer
    await db.insert(schema.users).values({
      email: "officer@maptanim.com",
      passwordHash: passwordHash,
      name: "Extension Officer",
      role: "extension_officer",
    });

    console.log("Successfully added users:");
    console.log("Admin: admin@maptanim.com / password123");
    console.log("Officer: officer@maptanim.com / password123");
  } catch (error) {
    console.error("Error adding users:", error);
  } finally {
    await connection.end();
  }
}

addUsers();
