import express from "express";
import { createPostController } from "../../controllers/post.controller";

const router = express.Router();

// Define the route for creating a post
router.post("/create", createPostController);

export default router;
