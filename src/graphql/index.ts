import { graphqlHTTP } from 'express-graphql';
import { makeExecutableSchema } from '@graphql-tools/schema';
import typeDefs from './schemas';
import resolvers from './resolvers';

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const graphqlMiddleware = graphqlHTTP({
  schema,
  graphiql: true,
});

export default graphqlMiddleware;
