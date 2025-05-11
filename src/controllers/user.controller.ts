import { Request, Response } from "express";  // Import Request and Response types from Express
import { createUser, deleteUser, getUser, getUserById, updateUser } from "../services/user.service";  // Import user service functions

// Controller to handle user creation (insert a new user)
export const insertUser = async (req: Request, res: Response) => {
  try {
    // Call the service function to create a user with the data from the request body
    const result = await createUser(req.body);

    // Send a successful response with a message about the created user
    res.status(201).json({ success: true, message: result.message });
  } catch (error) {
    // Send an error response if something goes wrong during user creation
    res.status(500).json({ success: false, error: "Internal error" });
  }
};

// Controller to handle fetching all users
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    // Call the service function to get all users
    const result = await getUser();

    // Send a successful response with the list of users
    res.status(200).json({ success: true, users: result });
  } catch (error) {
    // Send an error response if something goes wrong while fetching users
    res.status(500).json({ success: false, error: "Internal error" });
  }
};

// Controller to handle fetching a single user by their ID
export const getUserByIdController = async (req: Request, res: Response) => {
  try {
    // Extract the user ID from the request parameters
    const { id } = req.params;

    // Call the service function to fetch the user by their ID
    const user = await getUserById(id);

    // Send a successful response with the user data
    res.status(200).json({ success: true, user });
  } catch (error: any) {
    // Send a 404 response if the user is not found or any other error occurs
    res.status(404).json({ success: false, error: error.message });
  }
};

// Controller to handle updating a user's data
export const updateUserController = async (req: Request, res: Response) => {
  const { id } = req.params;  // Extract user ID from parameters
  const data = req.body;  // Extract the updated data from the request body

  try {
    // Call the service function to update the user with the new data
    const result = await updateUser(Number(id), data);

    // Return a successful response with a message about the update
    res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error: any) {
    // Log the error for debugging
    console.error(error);

    // Send an error response if something goes wrong during user update
    res.status(400).json({
      success: false,
      message: error.message || "An error occurred while updating the user.",
    });
  }
};

// Controller to handle deleting a user by their ID
export const deleteUserController = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;  // Extract user ID from parameters

  try {
    // Call the service function to delete the user by their ID
    await deleteUser(Number(id));

    // Send a successful response confirming the deletion
    res.status(200).json({
      message: "User deleted successfully",
    });
  } catch (error: any) {
    // Send an error response if something goes wrong during user deletion
    res.status(400).json({
      success: false,
      message: error.message || "An error occurred while deleting the user.",
    });
  }
};
