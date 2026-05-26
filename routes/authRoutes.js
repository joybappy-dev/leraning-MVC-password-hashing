import express from "express";
import jwt from "jsonwebtoken";
import { loginUser, privateRoute } from "../controllers/authControllers.js";
import { verifyToken } from "../middlewares/verifyJWT.js";

const router = express.Router();

router.post("/login", loginUser);
router.get("/private", verifyToken, privateRoute);

export default router;
