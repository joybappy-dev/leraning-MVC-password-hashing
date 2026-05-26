import express from "express";
import jwt from "jsonwebtoken";
import { loginUser, privateRoute } from "../controllers/authControllers.js";

const router = express.Router();

const verifyToken = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized access",
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    next();
  } catch (err) {
    return res.status(403).json({
      message: err.message,
    });
  }
};

router.post("/login", loginUser);
router.get("/private", verifyToken, privateRoute);

export default router;
