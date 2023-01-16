import * as yup from "yup";
import { Formik } from "formik";
import { useNavigate } from "react-router-native";
import { View, StyleSheet } from "react-native";
import FormikTextInput from "./FormikTextInput";
import useSignIn from "../hooks/useSignIn";
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
};

const SignInForm = ({ onSubmit }) => (
  <View style={style.container}>
    <FormikTextInput
      autoCapitalize="none"
      placeholder="Username"
      name="username"
    />
    <FormikTextInput placeholder="Password" name="password" secureTextEntry />
    <Button onPress={onSubmit} text="Sign in" />
  </View>
);

const validationSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

export const SignInContainer = ({ onSubmit }) => {
  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={initialValues}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

const SignIn = () => {
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;
    try {
      await signIn({ username, password });
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };

  return SignInContainer({
    onSubmit,
  });
};

export default SignIn;
