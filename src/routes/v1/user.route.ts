import express from "express";
import { deleteUserController, getAllUsers, getUserByIdController, insertUser, updateUserController } from "../../controllers/user.controller";

const router = express.Router();

router.route("/:id").get(getUserByIdController).put(updateUserController).delete(deleteUserController);

router.get("/get-users", getAllUsers);
router.post("/create", insertUser);

export default router;
