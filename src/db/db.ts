import dotenv from "dotenv";  // Import dotenv to load environment variables from .env file
dotenv.config({ path: ".env.local" });  // Load environment variables from the ".env.local" file

// Import the Neon serverless database client and the drizzle ORM for working with databases
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

// Check if the DATABASE_URL environment variable is missing in the .env.local file
if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is missing in .env.local");  // Throw an error if DATABASE_URL is not set
}

// Initialize the Neon database client with the DATABASE_URL from environment variables
const sql = neon(process.env.DATABASE_URL);

// Export the database connection using drizzle ORM for easy interaction with the Neon database
export const db = drizzle(sql);
