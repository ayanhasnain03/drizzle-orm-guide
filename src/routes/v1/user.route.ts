import express from "express";
// Import user controller functions that handle user-related logic
import {
  deleteUserController,
  getAllUsers,
  getUserByIdController,
  insertUser,
  updateUserController,
} from "../../controllers/user.controller";

// Create an Express router instance
const router = express.Router();

/**
 * Route to handle:
 * - GET /api/v1/users/:id -> Fetch a user by ID
 * - PUT /api/v1/users/:id -> Update user by ID
 * - DELETE /api/v1/users/:id -> Delete user by ID
 */
router
  .route("/:id")
  .get(getUserByIdController)
  .put(updateUserController)
  .delete(deleteUserController);

/**
 * Route to get all users
 * GET /api/v1/users/get-users
 */
router.get("/get-users", getAllUsers);

/**
 * Route to create a new user
 * POST /api/v1/users/create
 */
router.post("/create", insertUser);

// Export the router to be used in the main application
export default router;
