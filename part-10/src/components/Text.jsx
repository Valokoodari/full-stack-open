import { Text as RNText, StyleSheet } from "react-native";
import theme from "../theme";

const styles = StyleSheet.create({
  text: {
    marginBottom: 4,
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
});

const Text = ({ isHeading, isSubheading, isTag, children }) => {
  const textStyles = [
    styles.text,
    isTag && styles.tag,
    isHeading && styles.heading,
    isSubheading && styles.subheading,
  ];

  return <RNText style={textStyles}>{children}</RNText>;
};

export default Text;
