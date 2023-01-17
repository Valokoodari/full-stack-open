import { useState } from "react";
import { useDebounce } from "use-debounce";
import { useNavigate } from "react-router-native";
import { FlatList, View, Pressable, TextInput, StyleSheet } from "react-native";
import useRepositories from "../hooks/useRepositories";
import DropdownSelect from "./DropdownSelect";
import RepositoryItem from "./RepositoryItem";

const styles = StyleSheet.create({
  searchField: {
    height: 48,
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 16,
    margin: 10,
    marginBottom: 0,
    borderStyle: "solid",
    backgroundColor: "white",
  },
});

const sortOptions = [
  { label: "Latest repositories", value: "latest" },
  { label: "Highest rated repositories", value: "highest" },
  { label: "Lowest rated repositories", value: "lowest" },
];

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

const RepositoryList = () => {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("latest");

  const [searchKeyword] = useDebounce(search, 500);
  const { repositories } = useRepositories({ sort, searchKeyword });

  return (
    <View>
      <TextInput
        placeholder="Search"
        autoCapitalize="none"
        style={styles.searchField}
        onChangeText={(searchKeyword) => setSearch(searchKeyword)}
      />
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
