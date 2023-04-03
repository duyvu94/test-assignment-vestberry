import { GraphQLError } from 'graphql';
import authService, { RegisterLoginInput } from '../../services/authService';
import { generateToken } from '../../utils/generateToken';
import { RootValue } from '../types/types';

const authResolver = {
  Mutation: {
    register: async (rootValue: RootValue, input: RegisterLoginInput): Promise<any> => {
      const newUser = await authService.register(input);
      if (!newUser) {
        throw new GraphQLError('Email has already existed!');
      }

      const tokenPayload = { id: newUser.id, email: newUser.email };
      const token = generateToken(tokenPayload);

      return { user: newUser, token };
    },

    login: async (rootValue: RootValue, input: RegisterLoginInput): Promise<any> => {
      const user = await authService.login(input);

      if (!user) {
        throw new GraphQLError('Failed to login!');
      }

      const tokenPayload = { id: user.id, email: user.email };
      const token = generateToken(tokenPayload);

      return { user, token };
    },
  },
};

export default authResolver;
