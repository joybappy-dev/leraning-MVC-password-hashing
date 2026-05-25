import bcrypt from "bcrypt";
import User from "../models/User.model.js";

export const loginUser = async (req, res) => {
  try {
    const { email: requestedEmmail, password: plainTextPassword } = req.body;

    //FIND USER USING EMAIL FROM USERS COLLECTION
    const user = await User.findOne({ email: requestedEmmail });

    if (!user) {
      return res.send("Invalid Email Address");
    }
    const hashedPassword = user.password;

    // VALIDATE EMAIL AND PASSWORD
    const isCorrectPassword = await bcrypt.compare(
      plainTextPassword,
      hashedPassword,
    );
    const isCorrectEmail = requestedEmmail === user.email;

    if (!isCorrectEmail) {
      return res.send("Invalid Email");
    }
    if (!isCorrectPassword) {
      return res.send("Invalid Password");
    }

    res.send("Login Successful");
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
