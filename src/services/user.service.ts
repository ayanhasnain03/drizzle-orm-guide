import { db } from "../db/db";
import { InsertUser, usersTable } from "../db/schema";

export const createUser = async (user: InsertUser) => {
const [insertedUser] = await db
  .insert(usersTable)
  .values({ name: user.name, age: user.age, email: user.email })
  .returning();

return { message: `Thanks for registration, ${insertedUser.name}` };
};
