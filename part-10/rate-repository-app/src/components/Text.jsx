import { Text as RNText, StyleSheet } from "react-native";
import theme from "../theme";

const styles = StyleSheet.create({
  text: {
    marginBottom: 4,
    fontFamily: theme.fonts.main,
  },
  heading: {
    fontSize: theme.fontSizes.heading,
    fontWeight: "bold",
    marginBottom: 4,
  },
  subheading: {
    fontSize: theme.fontSizes.subheading,
    marginBottom: 4,
    color: "#777777",
  },
  tag: {
    backgroundColor: theme.colors.accent,
    fontSize: theme.fontSizes.body,
    alignSelf: "baseline",
    paddingHorizontal: 6,
    marginVertical: 4,
    borderRadius: 3,
    color: "white",
    padding: 3,
  },
  error: {
    color: theme.colors.error,
  },
});

const Text = ({ isHeading, isSubheading, isError, isTag, children }) => {
  const textStyles = [
    styles.text,
    isTag && styles.tag,
    isError && styles.error,
    isHeading && styles.heading,
    isSubheading && styles.subheading,
  ];

  return <RNText style={textStyles}>{children}</RNText>;
};

export default Text;
