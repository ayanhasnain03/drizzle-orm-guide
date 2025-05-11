import { Request, Response } from "express";
import { createPost } from "../services/post.service";

export const createPostController = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await createPost(req.body);
    res.status(201).json({
      success: true,
      post: result,
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "An error occurred while creating the post.",
    });
  }
};
