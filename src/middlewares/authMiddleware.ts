import { NextFunction, Request, Response } from 'express';
import { User } from '../models/user';
import { decodeToken } from '../utils/decodeToken';

interface AuthRequest extends Request {
  isAuth?: boolean;
  user?: User;
}

export async function authMiddleware(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    req.isAuth = false;
    return next();
  }

  const token = authHeader.split(' ')[1];
  if (!token || token === '') {
    req.isAuth = false;
    return next();
  }

  try {
    const decodedToken = decodeToken(token);
    if (!decodedToken) {
      req.isAuth = false;
      return next();
    }

    const user = await User.findByPk(decodedToken.id);
    if (!user) {
      req.isAuth = false;
      return next();
    }

    req.isAuth = true;
    req.user = user;
    return next();
  } catch (error) {
    req.isAuth = false;
    return next();
  }
}
