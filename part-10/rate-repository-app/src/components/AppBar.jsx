import Constants from "expo-constants";
import { View, StyleSheet, ScrollView } from "react-native";
import AppBarTab from "./AppBarTab";
import useMe from "../hooks/useMe";
import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.primary,
    flexDirection: "row",
  },
});

const AppBar = () => {
  const { me } = useMe();

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab path="/" text="Repositories" />
        {me ? (
          <>
            <AppBarTab path="/create" text="Create a review" />
            <AppBarTab path="/myreviews" text="My reviews" />
            <AppBarTab logout text="Sign out" />
          </>
        ) : (
          <>
            <AppBarTab path="/login" text="Sign in" />
            <AppBarTab path="/signup" text="Sign up" />
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
