const typeDefs = `

input BookInput {
    authors: [String]
    description: String!
    bookId: String!
    image: String
    link: String
    title: String!
}

type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    savedBooks: [Book]
}

type Book {
    authors: [String]
    description: String!
    bookId: String!
    title: String!
    image: String
    link: String
}

type Auth {
  token: ID!
  user: User

}

  type Query {
    me: User
}

type Comment {
  _id: ID!
  commentText: String!
  createdAt: String!
  username: String!
}

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(authors:  [String!], description: String!, bookId: String!, image: String!, link: String, title: String!): User
    removeBook(bookId: String!): User
    addComment(postId: ID!, commentText: String!): Comment
}
`
export default typeDefs;