import { db } from "../db/db";
import { InsertUser, SelectUser, usersTable } from "../db/schema";
import { eq } from "drizzle-orm";

/**
 * Creates a new user if one with the same email doesn't already exist.
 * @param user - User data (name, age, email)
 * @returns Success or existence message
 */
export const createUser = async (user: InsertUser) => {
  // Check if a user with the provided email already exists
  const userExist = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, user.email));

  if (userExist.length > 0) {
    return { message: "User Already Exists" };
  }

  // Insert new user
  const [insertedUser] = await db
    .insert(usersTable)
    .values({
      name: user.name,
      age: user.age,
      email: user.email,
    })
    .returning();

  return { message: `Thanks for registration, ${insertedUser.name}` };
};

/**
 * Retrieves all users from the database.
 * @returns Array of user records
 */
export const getUser = async () => {
  return await db.select().from(usersTable);
};

/**
 * Retrieves a single user by ID.
 * @param id - User ID as a string
 * @returns User record or throws error for invalid ID
 */
export const getUserById = async (id: string) => {
  const userId = parseInt(id, 10); // Convert string ID to number
  if (isNaN(userId)) {
    throw new Error("Invalid ID format");
  }

  return await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.id, userId));
};

/**
 * Updates user data for a specific user ID.
 * @param id - User ID as number
 * @param data - Partial user data (excluding ID)
 * @returns Update confirmation message
 */
export const updateUser = async (
  id: number,
  data: Partial<Omit<SelectUser, "id">>
) => {
  if (Object.keys(data).length === 0) {
    throw new Error("No fields to update");
  }

  await db.update(usersTable).set(data).where(eq(usersTable.id, id));

  return { message: `User with ID ${id} updated successfully` };
};

/**
 * Deletes a user by ID.
 * @param id - User ID
 */
export const deleteUser = async (id: SelectUser["id"]) => {
  await db.delete(usersTable).where(eq(usersTable.id, id));
};
