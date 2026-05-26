import express from "express";
import jwt from "jsonwebtoken";
import { loginUser, privateRoute } from "../controllers/authControllers.js";

const router = express.Router();

const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "unauthorized access",
      });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    next();
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

router.post("/login", loginUser);
router.get("/private", verifyToken, privateRoute);

export default router;
