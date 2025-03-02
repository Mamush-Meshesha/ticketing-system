import express from 'express';
import { LoginUser, logout, RegisterUser } from '../controllers/userController.js';

const router = express.Router();

router.post("/signup", RegisterUser)
router.post("/login", LoginUser)
router.post("/logout", logout)

export default router;