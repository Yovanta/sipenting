import { gql } from "@apollo/client";

export const ADD_USER = gql`
  mutation AddUser($password: String!, $email: String!) {
    insert_users(objects: { password: $password, email: $email }) {
      affected_rows
    }
  }
`;
