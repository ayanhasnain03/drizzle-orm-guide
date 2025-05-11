import { Request, Response } from "express";
import { createPost, getPostsByUserId } from "../services/post.service";


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
export const getUserPostController = async (req:Request,res:Response):Promise<void>=>{
 const {id} = req.params;
   const userId = Number(id);
 try {
  const posts = await getPostsByUserId(userId)
  res.status(200).json({
   success:true,
   posts:posts
  })
 } catch (error) {

 }
}
