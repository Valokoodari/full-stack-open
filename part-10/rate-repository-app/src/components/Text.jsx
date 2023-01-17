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
    color: theme.colors.textSecondary,
  },
  tag: {
    fontSize: theme.fontSizes.body,
    color: "white",
  },
  error: {
    color: theme.colors.error,
  },
  rating: {
    color: theme.colors.accent,
    fontSize: theme.fontSizes.rating,
    fontWeight: "bold",
    marginBottom: 0,
  },
});

const Text = ({
  isHeading,
  isSubheading,
  isError,
  isTag,
  isRating,
  children,
  ...props
}) => {
  const textStyles = [
    styles.text,
    isTag && styles.tag,
    isError && styles.error,
    isRating && styles.rating,
    isHeading && styles.heading,
    isSubheading && styles.subheading,
  ];

  return (
    <RNText style={textStyles} {...props}>
      {children}
    </RNText>
  );
};

export default Text;
