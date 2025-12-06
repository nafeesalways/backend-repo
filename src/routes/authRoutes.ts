
import express from 'express';
import { loginUser, logoutUser, checkAuth } from '../controllers/authController';
import { verifyToken } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.get('/me', verifyToken, checkAuth);

export default router;
