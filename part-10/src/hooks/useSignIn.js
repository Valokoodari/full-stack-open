import { useMutation } from "@apollo/client";
import { AUTHENTICATE } from "../graphql/mutations";

const useSignIn = () => {
  const [mutate, result] = useMutation(AUTHENTICATE);

  const signIn = async ({ username, password }) => {
    const result = await mutate({ variables: { credentials: { username, password } } });
    return result;
  };

  return [signIn, result];
}

export default useSignIn;
