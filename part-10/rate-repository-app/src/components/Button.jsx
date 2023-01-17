import { Pressable, Text, StyleSheet } from "react-native";
import theme from "../theme";

let style = StyleSheet.create({
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

const Button = ({ onPress, text, danger, ...props }) => {
  const buttonStyle = [
    style.button,
    props.style,
    danger && { backgroundColor: theme.colors.error },
  ];

  return (
    <Pressable style={buttonStyle} onPress={onPress}>
      <Text style={style.buttonText}>{text}</Text>
    </Pressable>
  );
};

export default Button;
