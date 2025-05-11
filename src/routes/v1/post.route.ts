import express from "express";
import { createPostController, getAllPostsControllers, getUserPostController } from "../../controllers/post.controller";

const router = express.Router();

router.post("/create", createPostController);
router.get("/all", getAllPostsControllers);
router.get("/user/:id", getUserPostController);

export default router;
