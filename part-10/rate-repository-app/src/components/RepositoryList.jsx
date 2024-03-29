import { useState } from "react";
import { useDebounce } from "use-debounce";
import { useNavigate } from "react-router-native";
import { FlatList, View, Pressable, TextInput, StyleSheet } from "react-native";
import useRepositories from "../hooks/useRepositories";
import DropdownSelect from "./DropdownSelect";
import RepositoryItem from "./RepositoryItem";
import theme from "../theme";

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

export const RepositoryListContainer = ({ repositories, onEndReach }) => {
  const navigate = useNavigate();

  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      style={{ marginBottom: 200 }}
      data={repositoryNodes}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
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
  const { repositories, fetchMore } = useRepositories({
    sort,
    searchKeyword,
    first: 8,
  });

  const onEndReach = () => {
    fetchMore();
  };

  return (
    <View>
      <TextInput
        placeholder="Search"
        autoCapitalize="none"
        style={styles.searchField}
        placeholderTextColor={theme.colors.textPlaceholder}
        onChangeText={(searchKeyword) => setSearch(searchKeyword)}
      />
      <DropdownSelect
        options={sortOptions}
        selectedValue={sort}
        onValueChange={(value) => setSort(value)}
      />
      <RepositoryListContainer
        repositories={repositories}
        onEndReach={onEndReach}
      />
    </View>
  );
};

export default RepositoryList;
