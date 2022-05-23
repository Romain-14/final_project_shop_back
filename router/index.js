import express from "express";
import authRoutes from "./api/v1/auth.routes.js";
import userRoutes from "./api/v1/user.routes.js";
import productRoutes from "./api/v1/product.routes.js";
import orderRoutes from "./api/v1/order.routes.js";
import mailingRoutes from "./api/v1/mailing.routes.js";

const router = express.Router();

router.use("/api/v1/auth", authRoutes);
router.use("/api/v1/user", userRoutes);
router.use("/api/v1/product", productRoutes);
router.use("/api/v1/order", orderRoutes);
router.use("/api/v1/mailing", mailingRoutes);

export default router;
