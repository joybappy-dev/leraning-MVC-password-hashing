import bcrypt from "bcrypt";
import User from "../models/User.model.js";

export const createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // 1. Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // 2. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Create new user object
    const newUser = {
      name,
      email,
      password: hashedPassword,
      role,
    };
    // 4. Insert user in db
    await User.create(newUser);

    // 4. Send response without the sensitive data
    res.status(201).json({
      success: true,
      message: "user registered successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: "server error: " + err.message,
    });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json({
      success: true,
      users,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};
