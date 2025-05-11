import express from "express";
import { getAllUsers, getUserByIdController, insertUser } from "../../controllers/user.controller";

const router = express.Router();

router.get("/:id", getUserByIdController);
router.get("/get-users", getAllUsers);
router.post("/create", insertUser);

export default router;
