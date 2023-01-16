import { View, StyleSheet, Image } from "react-native";
import StatItem from "./StatItem";
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
        <StatItem
          testID="repoStarCount"
          name="Stars"
          value={item.stargazersCount}
        />
        <StatItem testID="repoForkCount" name="Forks" value={item.forksCount} />
        <StatItem
          testID="repoReviewCount"
          name="Reviews"
          value={item.reviewCount}
        />
        <StatItem
          testID="repoRating"
          name="Rating"
          value={item.ratingAverage}
        />
      </View>
    </View>
  );
};

export default RepositoryItem;
