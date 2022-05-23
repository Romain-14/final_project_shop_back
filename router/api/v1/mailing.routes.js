import express from "express";
import { update } from "../../../controllers/user.controller.js";
import { auth } from "../../../middlewares/auth.js";

const router = express.Router();


router.get("/validateAccount/:uuid", auth, update);

export default router;
