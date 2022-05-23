import express from "express";
import { create, readByValue} from "../../../controllers/order.controller.js";
import { auth } from "../../../middlewares/auth.js";

const router = express.Router();


router.post("/save", auth, create);

// router.get("/", auth, readAll);
router.get("/:uuid", auth, readByValue);
// router.get("/detail/:id", auth, )


export default router;
