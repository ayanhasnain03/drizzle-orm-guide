import { and, desc, eq } from "drizzle-orm";
import { db } from "../db/db";
import { InsertPost, postsTable, SelectPost } from "../db/schema";

/**
 * Create a new post in the database.
 * @param post - Post data including title, content, and userId
 * @returns The inserted post record
 */
export const createPost = async (post: InsertPost) => {
  const [insertedPost] = await db
    .insert(postsTable)
    .values({
      title: post.title,
      content: post.content,
      userId: post.userId,
    })
    .returning(); // Return the inserted post
  return insertedPost;
};

/**
 * Get all posts made by a specific user.
 * @param userId - The ID of the user
 * @returns Array of posts by the given user
 */
export const getPostsByUserId = async (userId: SelectPost["userId"]) => {
  return db
    .select()
    .from(postsTable)
    .where(eq(postsTable.userId, userId)); // Filter posts where userId matches
};

/**
 * Get all posts with pagination, sorted by latest updated.
 * @param page - Current page number
 * @param limit - Number of posts per page
 * @returns Paginated list of posts
 */
export const getAllPosts = async (page: number, limit: number) => {
  return await db
    .select()
    .from(postsTable)
    .limit(limit) // Limit number of results
    .offset((page - 1) * limit) // Skip posts for previous pages
    .orderBy(desc(postsTable.updatedAt)); // Order by latest update
};
