import { FlatList } from "react-native";
import useMe from "../hooks/useMe";
import ReviewItem from "./ReviewItem";

const MyReviews = () => {
  const { me, fetchMore } = useMe({ includeReviews: true, first: 8 });

  const reviews = me?.reviews.edges.map((edge) => edge.node);

  const onEndReach = () => {
    fetchMore();
  };

  return (
    <FlatList
      data={reviews}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
      renderItem={({ item }) => <ReviewItem item={item} />}
    />
  );
};

export default MyReviews;
