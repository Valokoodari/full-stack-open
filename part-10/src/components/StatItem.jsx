import { View, StyleSheet } from "react-native";
import Text from "./Text";

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
});

const StatItem = ({ value, name }) => {
  if (typeof value === "number" && value >= 1000) {
    value = Math.round(value / 100) / 10 + "k";
  }

  return (
    <View style={styles.container}>
      <Text isHeading>{value}</Text>
      <Text isSubheading>{name}</Text>
    </View>
  );
};

export default StatItem;
