import { Request, Response } from "express";  // Import Request and Response types from Express
import { createPost, getAllPosts, getPostsByUserId } from "../services/post.service";  // Import post-related service functions

// Controller to handle the creation of a post
export const createPostController = async (req: Request, res: Response): Promise<void> => {
  try {
    // Call the service function to create a new post with the data from the request body
    const result = await createPost(req.body);

    // Send a successful response with the created post data
    res.status(201).json({
      success: true,
      post: result,
    });
  } catch (error: any) {
    // Log the error for debugging
    console.error(error);

    // Send an error response if something goes wrong while creating the post
    res.status(500).json({
      success: false,
      message: "An error occurred while creating the post.",
    });
  }
};

// Controller to handle fetching posts by a specific user ID
export const getUserPostController = async (req: Request, res: Response): Promise<void> => {
  // Extract the user ID from request parameters (assuming it's a number in the URL)
  const { id } = req.params;
  const userId = Number(id);  // Convert the ID to a number for the database query

  try {
    // Call the service function to fetch posts by the user ID
    const posts = await getPostsByUserId(userId);

    // Send a successful response with the posts for the specified user
    res.status(200).json({
      success: true,
      posts: posts,
    });
  } catch (error) {
    // In case of an error, send a generic error response
    res.status(500).json({
      success: false,
      message: "Failed to fetch posts for the user.",
    });
  }
};

// Controller to handle fetching all posts with pagination (using page and limit from query parameters)
export const getAllPostsControllers = async (req: Request, res: Response): Promise<void> => {
  // Destructure the 'page' and 'limit' query parameters (default 'limit' to 1 if not provided)
  const { page, limit = 1 } = req.query;

  try {
    // Call the service function to get all posts with pagination
    const result = await getAllPosts(page as any, limit as any);

    // Send a successful response with the list of posts
    res.status(200).json({ posts: result });
  } catch (error) {
    // Send an error response if something goes wrong while fetching posts
    res.status(500).json({ error: "Failed to fetch posts" });
  }
};
