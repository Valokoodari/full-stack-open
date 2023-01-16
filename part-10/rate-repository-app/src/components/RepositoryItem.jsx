import { useParams } from "react-router-native";
import { View, StyleSheet, Image, Linking } from "react-native";
import useRepository from "../hooks/useRepository";
import StatItem from "./StatItem";
import Button from "./Button";
import theme from "../theme";
import Text from "./Text";

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.card,
    padding: 15,
  },
  image: {
    width: theme.imageSizes.author,
    height: theme.imageSizes.author,
    marginRight: 15,
    borderRadius: 4,
  },
  stats: {
    justifyContent: "space-evenly",
    flexDirection: "row",
    marginTop: 8,
  },
});

const RepositoryItem = ({ item }) => {
  if (!item) {
    const { id } = useParams();
    const { repository } = useRepository(id);
    item = repository;
  }

  if (!item) {
    return null;
  }

  return (
    <View testID="repositoryItem" style={styles.card}>
      <View style={{ flexDirection: "row" }}>
        <Image
          source={{
            uri: item.ownerAvatarUrl,
          }}
          style={styles.image}
        />
        <View>
          <Text testID="repoFullName" isHeading>
            {item.fullName}
          </Text>
          <Text testID="repoDescription" isSubheading>
            {item.description}
          </Text>
          <Text testID="repoLanguage" isTag>
            {item.language}
          </Text>
        </View>
      </View>
      <View style={styles.stats}>
        <StatItem name="Stars" value={item.stargazersCount} />
        <StatItem name="Forks" value={item.forksCount} />
        <StatItem name="Reviews" value={item.reviewCount} />
        <StatItem name="Rating" value={item.ratingAverage} />
      </View>
      {item.url && (
        <Button
          onPress={() => {
            Linking.openURL(item.url);
          }}
          text="Open in GitHub"
        />
      )}
    </View>
  );
};

export default RepositoryItem;
