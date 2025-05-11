import express from "express";
import { insertUser } from "../../controllers/user.controller";

const router = express.Router();

router.post("/create", insertUser);

export default router;
