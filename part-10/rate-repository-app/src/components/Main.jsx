import { StyleSheet, View } from "react-native";
import { Route, Routes, Navigate } from "react-router-native";
import RepositoryItem from "./RepositoryItem";
import RepositoryList from "./RepositoryList";
import SignIn from "./SignIn";
import AppBar from "./AppBar";
import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: theme.colors.background,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path="/" element={<RepositoryList />} exact />
        <Route path="/login" element={<SignIn />} exact />
        <Route path="/repository/:id" element={<RepositoryItem />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </View>
  );
};

export default Main;
