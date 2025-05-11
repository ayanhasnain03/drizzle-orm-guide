import { db } from "../db/db";
import { InsertUser, usersTable } from "../db/schema";
import { eq } from "drizzle-orm";
export const createUser = async (user: InsertUser) => {
 const userExist = await db.select()
 .from(usersTable)
 .where(eq(usersTable.email,user.email))
 if(userExist) return {message:"User Already Exist"}
const [insertedUser] = await db
  .insert(usersTable)
  .values({ name: user.name, age: user.age, email: user.email })
  .returning();

return { message: `Thanks for registration, ${insertedUser.name}` };
};
export const getUser = async()=>{
 const users = await db.select().from(usersTable);
  return users;
}

export const getUserById = async(id:string)=>{
  const userId = parseInt(id, 10); // Convert the string id to a number
  if (isNaN(userId)) {
    throw new Error("Invalid ID format");
  }
return await db.select().from(usersTable).where(eq(usersTable.id, userId));
}
