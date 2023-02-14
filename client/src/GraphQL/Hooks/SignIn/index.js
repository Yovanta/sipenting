import { useMutation } from "@apollo/client";
import { ADD_USER } from "../../Mutation/AddUser";

export default function MutationSignIn() {
  const [addUser, { data, error }] = useMutation(ADD_USER);
  return { addUser, data, error };
}
