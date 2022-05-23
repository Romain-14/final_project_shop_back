import express from "express";
import { create, readAll, readOne, update, updateConnectionDate, signin, updateValidatedEmail } from "../../../controllers/user.controller.js";
import { auth } from "../../../middlewares/auth.js";

const router = express.Router();


router.post("/signup", create);
router.post("/signin", signin)

router.get("/", auth, readAll);
router.get("/:id", auth, readOne);


router.patch("/update/:uuid", auth, update);
router.patch("/updateValidateAccount/:uuid", updateValidatedEmail);
router.patch("/updateConnectionDate/:uuid", auth, updateConnectionDate);

// router.delete("/delete/:id", auth, deleteOne);

export default router;
