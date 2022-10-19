import { Text, Pressable, StyleSheet } from "react-native";
import { Link } from "react-router-native";

const styles = StyleSheet.create({
  container: {
    paddingLeft: 3,
    paddingRight: 17,
  },
  tabText: {
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
  },
});

const AppBarTab = ({ text, path }) => {
  return (
    <Link style={styles.container} to={path}>
      <Text style={styles.tabText}>{text}</Text>
    </Link>
  );
};

export default AppBarTab;
