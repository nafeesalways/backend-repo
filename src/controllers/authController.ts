
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { AuthRequest } from '../middleware/authMiddleware';
 
//requirements from assignment
const ADMIN_EMAIL = 'admin@test.com';
const ADMIN_PASS = '123456';

export const loginUser = (req: Request, res: Response) : any => {
  const { email, password } = req.body;

  // 1. check credential
  if (email !== ADMIN_EMAIL || password !== ADMIN_PASS) {
    return res.status(401).json({ success: false, message: 'Invalid email or password' });
  }

  // 2. make JWT token
  const token = jwt.sign(
    { email, role: 'admin' }, 
    process.env.JWT_SECRET as string, 
    { expiresIn: '1d' }
  );

  // 3. set HTTP-Only cookie
  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', 
    sameSite: 'lax',
    maxAge: 24 * 60 * 60 * 1000 // 1 day
  });

  return res.json({ success: true, message: 'Login successful' });
};

export const logoutUser = (req: Request, res: Response) => {
  res.clearCookie('token');
  return res.json({ success: true, message: 'Logged out successfully' });
};

export const checkAuth = (req: AuthRequest, res: Response) => {
  return res.json({ success: true, user: req.user });
};
