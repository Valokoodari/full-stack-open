import { View, StyleSheet } from "react-native";
import Constants from "expo-constants";
import AppBarTab from "./AppBarTab";
import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.primary,
    flexDirection: "row",
    padding: 15,
  },
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <AppBarTab path="/" text="Repositories" />
      <AppBarTab path="login" text="Sign in" />
    </View>
  );
};

export default AppBar;
