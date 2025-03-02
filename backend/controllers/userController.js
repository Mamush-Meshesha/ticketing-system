import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
import hashPassword from "../utils/hashPassword.js";

const RegisterUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = hashPassword(password);
    const user = await User.create({ name, email, password: hashedPassword });
    res.status(201).json({
      message: "User created successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
    logger.error(error.message);
  }
};


const LoginUser =  async (req,res) => {
    const { email, password } = req.body;
    try {
        const user = await User
            .findOne({ email });
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            const isPasswordCorrect = await bcrypt.compare(password, user.password);
            if (!isPasswordCorrect) {
                return res.status(400).json({ message: "Invalid credentials" });
            }

            const token = generateToken(user._id, user.isAdmin);
            res.status(200).json({
                message: "User logged in successfully",
                user,
                token,
            });
        } catch (error) {
            res.status(500).json({ message: "Server Error" });
            logger.error(error.message);
        }
}

export { RegisterUser, LoginUser };
