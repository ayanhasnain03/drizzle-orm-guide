import { integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';  // Import necessary types from Drizzle ORM for PostgreSQL

// Define the "users_table" schema using Drizzle ORM
export const usersTable = pgTable('users_table', {
  id: serial('id').primaryKey(),  // Define an auto-incrementing "id" column as the primary key
  name: text('name').notNull(),  // Define a "name" column as text and set it as not nullable
  age: integer('age').notNull(),  // Define an "age" column as an integer and set it as not nullable
  email: text('email').notNull().unique(),  // Define an "email" column as text, not nullable, and unique
});

// Define the "posts_table" schema using Drizzle ORM
export const postsTable = pgTable('posts_table', {
  id: serial('id').primaryKey(),  // Define an auto-incrementing "id" column as the primary key
  title: text('title').notNull(),  // Define a "title" column as text and set it as not nullable
  content: text('content').notNull(),  // Define a "content" column as text and set it as not nullable
  userId: integer('user_id')  // Define a "user_id" column as an integer (foreign key relation to the "users_table")
    .notNull()
    .references(() => usersTable.id, { onDelete: 'cascade' }),  // Set "user_id" as a foreign key referencing the "id" column in "users_table" with cascading delete
  createdAt: timestamp('created_at').notNull().defaultNow(),  // Define a "created_at" column as a timestamp with default value as the current time
  updatedAt: timestamp('updated_at')  // Define an "updated_at" column as a timestamp
    .notNull()
    .$onUpdate(() => new Date()),  // Set the "updated_at" column to auto-update whenever the record is updated
});

// Type definitions for inserting data into the "users_table"
export type InsertUser = typeof usersTable.$inferInsert;

// Type definitions for selecting data from the "users_table"
export type SelectUser = typeof usersTable.$inferSelect;

// Type definitions for inserting data into the "posts_table"
export type InsertPost = typeof postsTable.$inferInsert;

// Type definitions for selecting data from the "posts_table"
export type SelectPost = typeof postsTable.$inferSelect;
