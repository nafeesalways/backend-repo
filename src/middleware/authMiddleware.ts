
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';


export interface AuthRequest extends Request {
  user?: any;
}



export const verifyToken = (req: AuthRequest, res: Response, next: NextFunction) : any => {

  console.log("⚠️ Skipping token verification for localhost testing");
  req.user = { email: 'admin@test.com', role: 'admin' }; // ডামি ইউজার সেট করে দিলাম
  next(); 
  return; 
  // ===================================
};

