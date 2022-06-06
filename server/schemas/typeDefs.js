const { gql } = require("apollo-server-express");

// Defining all the necassary Query and Mutation types required for this application
const typeDefs = gql`
  type Query {
    me: User
  }

  input saveBookInput {
    authors: [String]
    description: String
    title: String
    bookId: Int
    image: String
    link: String
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(input: saveBookInput!): User!
    removeBook(bookId: Int!): User
  }

  type User {
    _id: ID
    username: String!
    email: String!
    password: String!
    savedBooks: [Book]
    bookCount: Int
  }

  type Book {
    bookId: String!
    authors: [String]
    description: String!
    title: String!
    image: String
    link: String
  }

  type Auth {
    token: ID!
    user: User
  }
`;

module.exports = typeDefs;
