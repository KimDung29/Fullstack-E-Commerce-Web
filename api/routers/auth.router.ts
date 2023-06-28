import express from "express"
import { register, login, logout, refreshToken } from "../controllers/auth.controller";
import { verifyToken } from "../middleware/jwt";

const router = express.Router();

router.post('/register', register)
router.post('/login', login)
router.post('/refresh-token', refreshToken)
router.post('/logout', logout)

export default router;