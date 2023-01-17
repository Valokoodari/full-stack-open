import { FlatList } from "react-native";
import ReviewItem from "./ReviewItem";
import useMe from "../hooks/useMe";

const MyReviews = () => {
  const { me, fetchMore, refetch } = useMe({ includeReviews: true, first: 8 });

  const reviews = me?.reviews.edges.map((edge) => edge.node);

  const onEndReach = () => {
    fetchMore();
  };

  return (
    <FlatList
      data={reviews}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
      renderItem={({ item }) => (
        <ReviewItem item={item} refetch={refetch} owner />
      )}
    />
  );
};

export default MyReviews;
