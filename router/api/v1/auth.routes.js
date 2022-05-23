import express from "express";
import { readOne } from "../../../controllers/user.controller.js";
import { auth } from "../../../middlewares/auth.js";

const router = express.Router();

router.get("/checkToken", auth, readOne);

export default router;
