import { useState } from "react";
import { useNavigate } from "react-router-native";
import { FlatList, View, Pressable } from "react-native";
import useRepositories from "../hooks/useRepositories";
import DropdownSelect from "./DropdownSelect";
import RepositoryItem from "./RepositoryItem";

export const RepositoryListContainer = ({ repositories }) => {
  const navigate = useNavigate();

  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      renderItem={({ item }) => (
        <Pressable
          onPress={() => {
            navigate("/repository/" + item.id);
          }}
        >
          <RepositoryItem item={item} />
        </Pressable>
      )}
    />
  );
};

const sortOptions = [
  { label: "Latest repositories", value: "latest" },
  { label: "Highest rated repositories", value: "highest" },
  { label: "Lowest rated repositories", value: "lowest" },
];

const RepositoryList = () => {
  const [sort, setSort] = useState("latest");
  const { repositories } = useRepositories(sort);

  return (
    <View>
      <DropdownSelect
        options={sortOptions}
        selectedValue={sort}
        onValueChange={(value) => setSort(value)}
      />
      <RepositoryListContainer repositories={repositories} />
    </View>
  );
};

export default RepositoryList;
