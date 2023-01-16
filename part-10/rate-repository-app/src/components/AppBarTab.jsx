import { Link } from "react-router-native";
import { useApolloClient } from "@apollo/client";
import { Text, Pressable, StyleSheet } from "react-native";
import useAuthStorage from "../hooks/useAuthStorage";
import theme from "../theme";

const styles = StyleSheet.create({
  tabText: {
    fontSize: theme.fontSizes.appbar,
    color: "white",
    fontWeight: "bold",
    padding: 14,
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
