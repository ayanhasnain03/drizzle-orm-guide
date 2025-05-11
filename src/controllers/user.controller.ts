import { Request, Response } from "express";
import { createUser, deleteUser, getUser, getUserById, updateUser } from "../services/user.service";

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

export const updateUserController = async(req:Request,res:Response)=>{
 const {id} =  req.params;
 const data = req.body;
try {
    const result = await updateUser(Number(id), data);

  // Return a successful response
    res.status(200).json({
      success: true,
      message: result.message,
    });
} catch (error:any) {
  console.error(error);
    res.status(400).json({
      success: false,
      message: error.message || "An error occurred while updating the user.",
    });
}}

export const deleteUserController = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    await deleteUser(Number(id));
    res.status(200).json({
      message: "User deleted successfully",
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "An error occurred while deleting the user.",
    });
  }
};
