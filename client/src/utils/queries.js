import { gql } from "@apollo/client";

// Query built from TypeDefs Query me which asks for User
// User can be found in mutations for when a User is created
export const GET_ME = gql`
  query GET_ME {
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
