import * as yup from "yup";
import { Formik } from "formik";
import { Pressable, Text, View, StyleSheet } from "react-native";
import FormikTextInput from "./FormikTextInput";
import theme from "../theme";

const style = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.card,
  },
  button: {
    height: 48,
    margin: 12,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    fontSize: theme.fontSizes.body,
    backgroundColor: theme.colors.accent,
  },
  buttonText: {
    color: "white",
  },
});

const initialValues = {
  username: "",
  password: "",
};

const SignInForm = ({ onSubmit }) => (
  <View style={style.container}>
    <FormikTextInput placeholder="Username" name="username" />
    <FormikTextInput placeholder="Password" name="password" secureTextEntry />
    <Pressable style={style.button} onPress={onSubmit}>
      <Text style={style.buttonText}>Sign in</Text>
    </Pressable>
  </View>
);

const validationSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

const SignIn = () => {
  const onSubmit = (values) => {
    console.log(values);
  };

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

export default SignIn;
