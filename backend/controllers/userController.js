import bcrypt from "bcrypt";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
import hashPassword from "../utils/hashPassword.js";
import logger from "../utils/logger.js";
import mongoose from "mongoose";

const RegisterUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await hashPassword(password);
    const user = await User.create({ name, email, password: hashedPassword });
    res.status(201).json({
      message: "User created successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
    logger.error(error.message);
  }
};

const LoginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = generateToken(res, user._id, user.role);
    res.status(200).json({
      message: "User logged in successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
    logger.error(error.message);
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
    logger.error(error.message);
  }
};

const getAllUser = async (req, res) => {
  try {
    const loggedInUser = req.user.id
console.log(loggedInUser)
    if (!loggedInUser) {
      return res.status(401).json({ message: "Not Authorized" });
    }
    const users = await User.find({_id: { $ne: loggedInUser }});
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
    logger.error(error.message);
  }
}

const getCommetingUser = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
    logger.error(error.message);
  }
}

const updateUser = async(req,res) => {
  const {id} = req.params
  try {

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid user ID format" });
    }
  

    const updatedUser = await User.findByIdAndUpdate(id, req.body, {new : true})

    if(!updatedUser){
      res.status(404).json({message: "user not found"})
    }

    res.status(200).json({message: "succesfully updated", updatedUser})


  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

const updateAdmin = async (req, res) => {
  const { id } = req.params;
  
  console.log("Request Body:", req.body); // Debugging
  console.log("Request Headers:", req.headers); // Debugging
  
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid user ID format" });
    }

    const updatedAdmin = await User.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedAdmin) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Admin updated successfully", updatedAdmin });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) {
      return res.status(404).json({ message: "User not found" });
    }

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User successfully deleted", deletedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

          

export { RegisterUser, LoginUser, logout, getAllUser,getCommetingUser ,updateUser,updateAdmin,deleteUser};
