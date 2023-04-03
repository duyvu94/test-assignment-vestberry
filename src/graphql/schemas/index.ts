import { mergeTypeDefs } from '@graphql-tools/merge';
import authSchema from './authSchema';
import bookSchema from './bookSchema';

const typeDefs = mergeTypeDefs([authSchema, bookSchema]);

export default typeDefs;
