import { IResolvers } from '@graphql-tools/utils';
import authResolver from './authResolver';
import bookResolver from './bookResolver';

const resolvers: IResolvers = {
  Mutation: {
    ...authResolver.Mutation,
    ...bookResolver.Mutation,
  },
  Query: {
    ...bookResolver.Query,
  },
};

export default resolvers;
