import { gql } from '@apollo/client';
import { DocumentNode } from 'graphql';

export const GET_ME = gql`
  query getMe {
    me {
      _id
      username
      email
      savedBooks {
        bookId
        authors
        description
        title
        image
        link
      }
    }
  }
`;

export const GET_BOOKS: DocumentNode = gql`
  query GetBooks {
    books {
      title
      author
    }
  }
`;