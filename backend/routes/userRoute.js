import express from 'express';
import { getAllUser, LoginUser, logout, RegisterUser } from '../controllers/userController.js';
import verifyToken from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post("/signup", RegisterUser)
router.post("/login", LoginUser)
router.post("/logout", logout)
router.get("/users",verifyToken, getAllUser)

export default router;