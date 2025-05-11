import { eq } from "drizzle-orm";
import { db } from "../db/db";
import { InsertPost, postsTable, SelectPost } from "../db/schema";

export const createPost = async(post:InsertPost)=>{
const [insertedPost] = await db
.insert(postsTable).values({
 title:post.title,
 content:post.content,
 userId:post.userId,
}).returning()
return insertedPost;
}

export const getPostsByUserId = async (userId: SelectPost["userId"]) => {
  return db
    .select()
    .from(postsTable)
    .where(eq(postsTable.userId, userId)); // use `eq` from drizzle-orm
};
