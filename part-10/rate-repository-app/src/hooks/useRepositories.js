import { useQuery } from "@apollo/client";
import { useState, useEffect } from "react";
import { GET_REPOSITORIES } from "../graphql/queries";

const orders = {
  latest: { orderBy: "CREATED_AT", orderDirection: "DESC" },
  highest: { orderBy: "RATING_AVERAGE", orderDirection: "DESC" },
  lowest: { orderBy: "RATING_AVERAGE", orderDirection: "ASC" },
};

const useRepositories = ({ sort, searchKeyword }) => {
  const [repositories, setRepositories] = useState();
  const { data, loading, error } = useQuery(GET_REPOSITORIES, {
    variables: { ...orders[sort], searchKeyword },
    fetchPolicy: "cache-and-network",
  });

  useEffect(() => {
    if (data) {
      setRepositories(data.repositories);
    }
  }, [data]);

  return { repositories, loading, error };
};

export default useRepositories;
