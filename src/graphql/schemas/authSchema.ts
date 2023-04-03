import { gql } from 'apollo-server-core';

const authSchema = gql`
  type User {
    id: ID!
    email: String!
  }

  type AuthPayload {
    user: User!
    token: String!
  }

  type Mutation {
    register(email: String!, password: String!): AuthPayload!
    login(email: String!, password: String!): AuthPayload!
  }
`;

export default authSchema;
