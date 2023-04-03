// src/services/authService.ts

import { User } from '../models/user';

export interface RegisterLoginInput {
  email: string;
  password: string;
}

class AuthService {
  async register(input: RegisterLoginInput): Promise<User | null> {
    if (await User.findOne({ where: { email: input.email } })) return null;

    return User.create({ ...input });
  }

  async login({ email, password }: RegisterLoginInput): Promise<User | null> {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return null;
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return null;
    }

    return user;
  }
}

export default new AuthService();
