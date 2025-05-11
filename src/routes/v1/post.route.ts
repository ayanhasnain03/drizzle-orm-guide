import express from "express";
// Import post controller functions for handling various post-related endpoints
import { createPostController, getAllPostsControllers, getUserPostController } from "../../controllers/post.controller";

// Initialize an Express router instance
const router = express.Router();

// Route to create a new post
// POST /api/v1/post/create
router.post("/create", createPostController);

// Route to get all posts (optionally paginated)
// GET /api/v1/post/all
router.get("/all", getAllPostsControllers);

// Route to get all posts created by a specific user using their user ID
// GET /api/v1/post/user/:id
router.get("/user/:id", getUserPostController);

// Export the router to be used in the main server entry
export default router;
