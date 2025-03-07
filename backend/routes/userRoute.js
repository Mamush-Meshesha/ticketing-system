import express from "express";
import {
  deleteUser,
  getAllUser,
  getCommetingUser,
  LoginUser,
  logout,
  RegisterUser,
  updateAdmin,
  updateUser,
} from "../controllers/userController.js";
import verifyToken from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/signup", RegisterUser);
router.post("/login", LoginUser);
router.post("/logout", logout);
router.get("/users", verifyToken, getAllUser);
router.get("/user", verifyToken, getCommetingUser);
router.put("/update/:id", verifyToken, updateUser);
router.put("/update/admin/:id", verifyToken, updateAdmin);
router.delete("/delete/:id", verifyToken, deleteUser);

export default router;
