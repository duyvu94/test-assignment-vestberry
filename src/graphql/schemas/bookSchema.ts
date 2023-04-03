import { gql } from 'apollo-server-core';

const bookSchema = gql`
  type Book {
    id: ID!
    title: String!
    author: String!
    yearOfPublication: Int!
    genres: String!
    rating: Float!
    description: String
    createdAt: String!
    updatedAt: String!
  }

  type BookHistory {
    id: ID!
    bookId: ID!
    title: String!
    author: String!
    yearOfPublication: Int!
    genres: String!
    rating: Float!
    description: String
    version: Int!
    createdAt: String!
  }

  type Query {
    findBooks(keyword: String, limit: Int, offset: Int): [Book]!
    getLatestBookVersion(id: ID!): BookHistory!
    getBookHistory(id: ID!, limit: Int, offset: Int): [BookHistory]!
  }

  type Mutation {
    createBook(
      title: String!
      author: String!
      yearOfPublication: Int!
      genres: String!
      rating: Float!
      description: String
    ): Book!
    revertToVersion(id: ID!, version: Int!): Book!
    updateBook(
      id: ID!
      title: String
      author: String
      yearOfPublication: Int
      genres: String
      rating: Float
      description: String
    ): Book!
    deleteBook(id: ID!): Boolean!
  }
`;

export default bookSchema;
