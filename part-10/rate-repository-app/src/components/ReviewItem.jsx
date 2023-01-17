import { format } from "date-fns";
import { useNavigate } from "react-router-native";
import { Alert, StyleSheet, View } from "react-native";
import useDeleteReview from "../hooks/useDeleteReview";
import useMe from "../hooks/useMe";
import Button from "./Button";
import theme from "../theme";
import Text from "./Text";

const styles = StyleSheet.create({
  card: {
    padding: 15,
    marginBottom: 10,
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
  row: {
    flexDirection: "row",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  button: {
    margin: 0,
    marginTop: 10,
    flexGrow: 1,
  },
});

const ReviewItem = ({ item, owner, refetch }) => {
  const navigate = useNavigate();
  const [deleteReview] = useDeleteReview();

  const handleViewRepository = () => {
    navigate(`/repository/${item.repository.id}`);
  };

  const handleDeleteReview = () => {
    Alert.alert(
      "Delete review",
      "Are you sure you want to delete this review?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            await deleteReview(item.id);
            refetch();
          },
        },
      ]
    );
  };

  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <View style={styles.rating}>
          <Text isRating>{item.rating}</Text>
        </View>
        <View style={{ flexShrink: 1 }}>
          {owner ? (
            <Text isHeading>{item.repository.fullName}</Text>
          ) : (
            <Text isHeading>{item.user.username}</Text>
          )}
          <Text>{format(new Date(item.createdAt), "dd.MM.yyyy")}</Text>
          {item.text && item.text != "" && <Text>{item.text}</Text>}
        </View>
      </View>
      {owner && (
        <View style={styles.buttons}>
          <Button
            text="View repository"
            onPress={handleViewRepository}
            style={{ ...styles.button, marginRight: 12 }}
          />
          <Button
            onPress={handleDeleteReview}
            style={styles.button}
            text="Delete review"
            danger
          />
        </View>
      )}
    </View>
  );
};

export default ReviewItem;
