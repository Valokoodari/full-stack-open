import Constants from "expo-constants";
import { useQuery } from "@apollo/client";
import { View, StyleSheet, ScrollView } from "react-native";
import { GET_ME } from "../graphql/queries";
import AppBarTab from "./AppBarTab";
import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.primary,
    flexDirection: "row",
  },
});

const AppBar = () => {
  const { data } = useQuery(GET_ME);

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab path="/" text="Repositories" />
        {data?.me ? (
          <>
            <AppBarTab path="/create" text="Create a review" />
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
