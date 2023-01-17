import { useQuery } from "@apollo/client";
import { GET_ME } from "../graphql/queries";

const useMe = (variables) => {
  const { data, loading, fetchMore, ...result } = useQuery(GET_ME, {
    variables,
    fetchPolicy: "cache-and-network",
  });

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.me.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.me.reviews.pageInfo.endCursor,
        ...variables,
      },
    });
  };

  return {
    me: data?.me,
    fetchMore: handleFetchMore,
    loading,
    ...result,
  };
};

export default useMe;
