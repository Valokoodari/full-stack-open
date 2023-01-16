import { FlatList } from "react-native";
import { useParams } from "react-router-native";
import useRepository from "../hooks/useRepository";
import RepositoryItem from "./RepositoryItem";
import ReviewItem from "./ReviewItem";

const SingleRepository = () => {
  const { id } = useParams();
  const { repository } = useRepository(id);

  if (!repository) {
    return null;
  }

  return (
    <FlatList
      data={repository.reviews.edges.map((edge) => edge.node)}
      renderItem={({ item }) => <ReviewItem item={item} />}
      ListHeaderComponent={() => <RepositoryItem item={repository} />}
      keyExtractor={({ id }) => id}
    />
  );
};

export default SingleRepository;
