import { FlatList } from "react-native";
import { useParams } from "react-router-native";
import useRepository from "../hooks/useRepository";
import RepositoryItem from "./RepositoryItem";
import ReviewItem from "./ReviewItem";

const SingleRepository = () => {
  const { id } = useParams();
  const { repository, fetchMore } = useRepository({ id, first: 8 });

  if (!repository) {
    return null;
  }

  const onEndReach = () => {
    fetchMore();
  };

  return (
    <FlatList
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
      keyExtractor={({ id }) => id}
      renderItem={({ item }) => <ReviewItem item={item} />}
      data={repository.reviews.edges.map((edge) => edge.node)}
      ListHeaderComponent={() => <RepositoryItem item={repository} />}
    />
  );
};

export default SingleRepository;
