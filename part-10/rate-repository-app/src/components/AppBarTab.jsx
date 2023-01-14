import { Link } from "react-router-native";
import { useApolloClient } from "@apollo/client";
import { Text, Pressable, StyleSheet } from "react-native";
import useAuthStorage from "../hooks/useAuthStorage";

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

const AppBarTab = ({ text, path, logout }) => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  const handleSignOut = async () => {
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
  };

  if (logout) {
    return (
      <Pressable style={styles.container} onPress={handleSignOut}>
        <Text style={styles.tabText}>{text}</Text>
      </Pressable>
    );
  }

  return (
    <Link style={styles.container} to={path}>
      <Text style={styles.tabText}>{text}</Text>
    </Link>
  );
};

export default AppBarTab;
