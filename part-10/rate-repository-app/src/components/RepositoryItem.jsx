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
    <View style={styles.card}>
      <View style={{ flexDirection: "row" }}>
        <Image
          source={{
            uri: item.ownerAvatarUrl,
          }}
          style={styles.image}
        />
        <View>
          <Text isHeading>{item.fullName}</Text>
          <Text isSubheading>{item.description}</Text>
          <Text isTag>{item.language}</Text>
        </View>
      </View>
      <View style={styles.stats}>
        <StatItem name="Stars" value={item.stargazersCount} />
        <StatItem name="Forks" value={item.forksCount} />
        <StatItem name="Reviews" value={item.reviewCount} />
        <StatItem name="Rating" value={item.ratingAverage} />
      </View>
    </View>
  );
};

export default RepositoryItem;
