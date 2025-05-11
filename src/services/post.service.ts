import { db } from "../db/db";
import { InsertPost, postsTable } from "../db/schema";

export const createPost = async(post:InsertPost)=>{
const [insertedPost] = await db
.insert(postsTable).values({
 title:post.title,
 content:post.content,
 userId:post.userId,
}).returning()
return insertedPost;
}
