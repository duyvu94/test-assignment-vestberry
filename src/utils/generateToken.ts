import jwt from 'jsonwebtoken';
import { config } from '../config';

interface TokenPayload {
  id: number;
  email: string;
}

export function generateToken(payload: TokenPayload): string {
  const options = { expiresIn: '1h' };
  return jwt.sign(payload, config.JWT_SECRET, options);
}
