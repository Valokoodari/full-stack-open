import { Pressable, Text, StyleSheet } from "react-native";
import theme from "../theme";

const style = StyleSheet.create({
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

const Button = ({ onPress, text }) => {
  return (
    <Pressable style={style.button} onPress={onPress}>
      <Text style={style.buttonText}>{text}</Text>
    </Pressable>
  );
};

export default Button;
