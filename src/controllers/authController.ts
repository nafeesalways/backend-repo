import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { AuthRequest } from '../middleware/authMiddleware';


const ADMIN_EMAIL = 'admin@test.com';
const ADMIN_PASS = '123456';

export const loginUser = (req: Request, res: Response) : any => {
  const { email, password } = req.body;

  // check credential
  if (email !== ADMIN_EMAIL || password !== ADMIN_PASS) {
    return res.status(401).json({ success: false, message: 'Invalid email or password' });
  }

  // 2. JWT token generate

  const secret = process.env.JWT_SECRET || 'fallback_secret_key';
  
  const token = jwt.sign(
    { email, role: 'admin' }, 
    secret, 
    { expiresIn: '1d' }
  );

  // 3. set cookie
res.cookie('token', token, {
  httpOnly: true,
  secure: true, 
  sameSite: 'none', 
  path: '/',
  maxAge: 24 * 60 * 60 * 1000
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
