import bcrypt from "bcrypt";
import User from "../models/User.model.js";
import jwt from "jsonwebtoken";

export const loginUser = async (req, res) => {
  try {
    const { email: requestedEmmail, password: plainTextPassword } = req.body;

    //FIND USER USING EMAIL FROM USERS COLLECTION
    const user = await User.findOne({ email: requestedEmmail });

    if (!user) {
      return res.send("invalid credentials");
    }
    const hashedPassword = user.password;

    // VALIDATE EMAIL AND PASSWORD
    const isCorrectPassword = await bcrypt.compare(
      plainTextPassword,
      hashedPassword,
    );

    // const isCorrectEmail = requestedEmmail === user.email;
    // if (!isCorrectEmail) {
    //   return res.status(401).json({
    //     success: false,
    //     message: "Invalid credentials",
    //   });
    // }

    if (!isCorrectPassword) {
      return res.status(401).json({
        success: false,
        message: "invalid credentials",
      });
    }

    // IF password and email is ok then generate token
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        name: user.name,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "60s",
      },
    );

    res.status(200).json({
      success: true,
      token,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export const privateRoute = async (req, res) => {
  res.status(200).json({
    success: true,
    message: "Here is your secret",
  });
};
