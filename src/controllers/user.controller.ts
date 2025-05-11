import { Request, Response } from "express";
import { createUser, getUser, getUserById } from "../services/user.service";

export const insertUser = async (req: Request, res: Response) => {
  try {
    const result = await createUser(req.body);
    res.status(201).json({ success: true, message: result.message });
  } catch (error) {
    res.status(500).json({ success: false, error: "Internal error" });
  }
};
export const getAllUsers = async(req:Request,res:Response)=>{
try {
 const result = await getUser();
 res.status(200).json({success:true,users:result})
} catch (error) {
    res.status(500).json({ success: false, error: "Internal error" });
}
}

export const getUserByIdController = async(req:Request,res:Response)=>{
try {
 const { id } = req.params;
 const user = await getUserById(id);
 res.status(200).json({ success: true, user });
  } catch (error:any) {
    res.status(404).json({ success: false, error: error.message });
  }
}
