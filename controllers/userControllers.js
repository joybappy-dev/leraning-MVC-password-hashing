import bcrypt from "bcrypt";

export const users = [];

export const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const newUserData = { name, email, password };

    const hashedPassword = await bcrypt.hash(password, 10);

    newUserData.password = hashedPassword;
    newUserData.createdAt = new Date().toISOString();

    users.push(newUserData);

    res.status(201).json({
      success: true,
      message: "User created successfully",
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

export const getAllUsers = async (req, res) => {
  try {
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