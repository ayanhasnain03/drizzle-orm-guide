import express from "express";
import { createPostController, getUserPostController } from "../../controllers/post.controller";

const router = express.Router();

router.post("/create", createPostController);
router.get("/user/:id", getUserPostController);

export default router;
