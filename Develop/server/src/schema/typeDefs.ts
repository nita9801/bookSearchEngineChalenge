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

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(authors:  [String!], description: String!, bookId: String!, image: String!, link: String, title: String!): User
    removeBook(bookId: String!): User
}
`
export default typeDefs;