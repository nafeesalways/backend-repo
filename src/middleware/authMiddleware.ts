
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// custom interface for using req.user
export interface AuthRequest extends Request {
  user?: any;
}

// src/middleware/authMiddleware.ts

export const verifyToken = (req: AuthRequest, res: Response, next: NextFunction) : any => {
  // === TEMPORARY FIX FOR LOCALHOST ===
  // কুকি চেক না করে সরাসরি পাস করে দিচ্ছি
  console.log("⚠️ Skipping token verification for localhost testing");
  req.user = { email: 'admin@test.com', role: 'admin' }; // ডামি ইউজার সেট করে দিলাম
  next(); 
  return; 
  // ===================================
};

