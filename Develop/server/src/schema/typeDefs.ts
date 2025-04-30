import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Book {
  bookId: String!
  title: String!
  authors: [String]
  description: String
  image: String
  link: String
}
type User {
  _id: ID!
  username: String!
  email: String!
  savedBooks: [Book]
}

  type Auth {
    token: String!
    user: User
  }

  type Query {
    me: User
  }

  input BookInput {
  bookId: String!
  title: String!
  authors: [String]
  description: String
  image: String
  link: String
}

 type Mutation {
  addUser(username: String!, email: String!, password: String!): Auth
  login(email: String!, password: String!): Auth
  saveBook(bookData: BookInput!): User
  removeBook(bookId: String!): User
}

type Auth {
  token: String!
  user: User
}
`;
export default typeDefs;