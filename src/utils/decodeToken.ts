import jwt from 'jsonwebtoken';
import { config } from '../config';

interface DecodedToken {
  id: number;
  email: string;
  iat: number;
  exp: number;
}

export function decodeToken(token: string): DecodedToken | null {
  try {
    const decodedToken = jwt.verify(token, config.JWT_SECRET) as DecodedToken;
    return decodedToken;
  } catch (error) {
    return null;
  }
}
