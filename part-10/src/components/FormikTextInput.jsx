import { useField } from "formik";
import { TextInput, StyleSheet } from "react-native";
import theme from "../theme";
import Text from "./Text";

const style = StyleSheet.create({
  inputField: {
    height: 48,
    margin: 12,
    borderWidth: 1,
    borderRadius: 4,
    paddingLeft: 16,
    borderStyle: "solid",
    fontSize: theme.fontSizes.body,
    borderColor: theme.colors.border,
  },
});

const FormikTextInput = ({ name, ...props }) => {
  const [field, meta, helpers] = useField(name);
  const showError = meta.touched && meta.error;

  return (
    <>
      <TextInput
        onChangeText={(text) => helpers.setValue(text)}
        onBlur={() => helpers.setTouched(true)}
        style={style.inputField}
        value={field.value}
        error={showError}
        {...props}
      />
      {showError && <Text>{meta.error}</Text>}
    </>
  );
};

export default FormikTextInput;
