import { db } from "../db/db";
import { InsertUser, SelectUser, usersTable } from "../db/schema";
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

export const updateUser = async (
  id: number, // ID of the user to update
  data: Partial<Omit<SelectUser, 'id'>>
) => {
  // Check if data has at least one property to update
  if (Object.keys(data).length === 0) {
    throw new Error("No fields to update");
  }

  // Perform the update query
  await db
    .update(usersTable)
    .set(data) // Set the data you want to update
    .where(eq(usersTable.id, id)); // Filter by user ID

  return { message: `User with ID ${id} updated successfully` };
};

export const deleteUser = async(id:SelectUser["id"])=>{
 await db.delete(usersTable).where(eq(usersTable.id,id))
}
