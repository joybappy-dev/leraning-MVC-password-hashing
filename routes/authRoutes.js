import express from "express";
import jwt from "jsonwebtoken";
import { loginUser, privateRoute } from "../controllers/authControllers.js";
import { verifyAdmin, verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/login", loginUser);
router.get("/private", verifyToken, verifyAdmin, privateRoute);

export default router;
