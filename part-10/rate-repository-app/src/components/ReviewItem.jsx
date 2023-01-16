import { format } from "date-fns";
import { StyleSheet, View } from "react-native";
import theme from "../theme";
import Text from "./Text";

const styles = StyleSheet.create({
  card: {
    padding: 15,
    marginBottom: 10,
    flexDirection: "row",
    backgroundColor: theme.colors.card,
  },
  rating: {
    borderRadius: theme.imageSizes.rating / 2,
    borderColor: theme.colors.accent,
    height: theme.imageSizes.rating,
    width: theme.imageSizes.rating,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
    borderWidth: 2,
  },
});

const ReviewItem = ({ item }) => {
  return (
    <View style={styles.card}>
      <View style={styles.rating}>
        <Text isRating>{item.rating}</Text>
      </View>
      <View style={{ flexShrink: 1 }}>
        <Text isHeading>{item.user.username}</Text>
        <Text>{format(new Date(item.createdAt), "dd.MM.yyyy")}</Text>
        {item.text && item.text != "" && <Text>{item.text}</Text>}
      </View>
    </View>
  );
};

export default ReviewItem;
