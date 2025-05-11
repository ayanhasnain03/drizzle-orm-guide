import { config } from "dotenv";

// Load environment variables from .env.local
config({ path: ".env.local" });

import { defineConfig } from "drizzle-kit";

// Ensure DATABASE_URL is defined
if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is missing in .env.local");
}

export default defineConfig({
  schema: "./db/schema.ts",      // Path to your schema
  out: "./migrations",           // Directory for migration files
  dialect: "postgresql",         // SQL dialect
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
});
