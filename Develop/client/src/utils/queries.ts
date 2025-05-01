import { gql } from '@apollo/client';

export const QUERY_ME = gql`
 query Me {
  me {
    _id
    email
    savedBooks {
      authors
      bookId
      description
      image
      link
      title
    }
    username
  }
}
`;