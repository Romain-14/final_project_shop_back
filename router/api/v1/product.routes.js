import express from "express";
import { create, readAll, readOne, update, deleteOne } from "../../../controllers/product.controller.js";
import { auth } from "../../../middlewares/auth.js";

const router = express.Router();


router.post("/add", auth, create);

router.get("/", readAll);
router.get("/:id", readOne);

router.patch("/update/:id", auth, update);

router.delete("/delete/:id", auth, deleteOne);

export default router;
