import bcrypt from "bcrypt";

const users = [

]

export const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const newUserData = { name, email, password };

    const hashedPassword = await bcrypt.hash(password, 10);

    users.push()

    res.send("helll");
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};
