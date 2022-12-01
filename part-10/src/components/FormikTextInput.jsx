import { useField } from "formik";
import { View, TextInput, StyleSheet } from "react-native";
import theme from "../theme";
import Text from "./Text";

const style = StyleSheet.create({
  container: {
    margin: 12,
    marginBottom: 0,
  },
  inputField: {
    height: 48,
    borderWidth: 1,
    borderRadius: 4,
    paddingLeft: 16,
    marginBottom: 6,
    borderStyle: "solid",
    fontSize: theme.fontSizes.body,
    borderColor: theme.colors.border,
  },
  invalidInput: {
    borderColor: theme.colors.error,
  },
});

const FormikTextInput = ({ name, ...props }) => {
  const [field, meta, helpers] = useField(name);
  const showError = meta.touched && meta.error;

  return (
    <View style={style.container}>
      <TextInput
        onChangeText={(text) => helpers.setValue(text)}
        onBlur={() => helpers.setTouched(true)}
        style={[style.inputField, showError && style.invalidInput]}
        value={field.value}
        error={showError}
        {...props}
      />
      {showError && <Text isError>{meta.error}</Text>}
    </View>
  );
};

export default FormikTextInput;
