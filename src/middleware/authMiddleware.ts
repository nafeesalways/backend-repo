
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// custom interface for using req.user
export interface AuthRequest extends Request {
  user?: any;
}

export const verifyToken = (req: AuthRequest, res: Response, next: NextFunction) : any => {
  const token = req.cookies.token; // taken token from cookie

  if (!token) {
    return res.status(401).json({ success: false, message: 'Unauthorized: No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    req.user = decoded;
    next(); 
  } catch (error) {
    return res.status(403).json({ success: false, message: 'Forbidden: Invalid token' });
  }
};
