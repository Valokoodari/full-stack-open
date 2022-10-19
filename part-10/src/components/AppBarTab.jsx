import { Text, Pressable, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  tabText: {
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
  }
});

const AppBarTab = ({ text }) => {
  return (
    <Pressable onPress={() => console.log("Pressed!")}>
      <Text style={styles.tabText}>{text}</Text>
    </Pressable>
  );
};

export default AppBarTab;
