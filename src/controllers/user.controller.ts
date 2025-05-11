import { Request, Response } from "express";
import { createUser } from "../services/user.service";

export const insertUser = async (req: Request, res: Response) => {
  try {
    const result = await createUser(req.body);
    res.status(201).json({ success: true, message: result.message });
  } catch (error) {
    res.status(500).json({ success: false, error: "Internal error" });
  }
};
