import * as yup from "yup";
import { Formik } from "formik";
import { View, StyleSheet } from "react-native";
import { useNavigate } from "react-router-native";
import FormikTextInput from "./FormikTextInput";
import useSignIn from "../hooks/useSignIn";
import useSignUp from "../hooks/useSignUp";
import Button from "./Button";
import theme from "../theme";

const style = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.card,
  },
});

const initialValues = {
  username: "",
  password: "",
  passwordConfirmation: "",
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required("Username is required")
    .min(1, "Username must be between 1 and 30 characters")
    .max(30, "Username must be between 1 and 30 characters"),
  password: yup
    .string()
    .required("Password is required")
    .min(5, "Password must be between 5 and 50 characters")
    .max(50, "Password must be between 5 and 50 characters"),
  passwordConfirmation: yup
    .string()
    .required("Password confirmation is required")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

const SignUpForm = ({ onSubmit }) => (
  <View style={style.container}>
    <FormikTextInput
      autoCapitalize="none"
      placeholder="Username"
      name="username"
    />
    <FormikTextInput placeholder="Password" name="password" secureTextEntry />
    <FormikTextInput
      placeholder="Password confirmation"
      name="passwordConfirmation"
      secureTextEntry
    />
    <Button onPress={onSubmit} text="Sign up" />
  </View>
);

const SignUp = () => {
  const [signIn] = useSignIn();
  const navigate = useNavigate();
  const [createUser] = useSignUp();

  const onSubmit = async (values) => {
    const { username, password } = values;
    try {
      await createUser({ username, password });
      await signIn({ username, password });
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={initialValues}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignUp;
