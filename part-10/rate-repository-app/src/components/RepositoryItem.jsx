import { View, StyleSheet, Image, Linking } from "react-native";
import StatItem from "./StatItem";
import Button from "./Button";
import theme from "../theme";
import Text from "./Text";

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.card,
    padding: 15,
    marginBottom: 10,
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

const RepositoryItem = ({ item }) => (
  <View testID="repositoryItem" style={styles.card}>
    <View style={{ flexDirection: "row" }}>
      <Image
        source={{
          uri: item.ownerAvatarUrl,
        }}
        style={styles.image}
      />
      <View style={{ flexShrink: 1 }}>
        <Text testID="repoFullName" isHeading>
          {item.fullName}
        </Text>
        <Text testID="repoDescription" isSubheading>
          {item.description}
        </Text>
        <View
          style={{
            backgroundColor: theme.colors.accent,
            alignSelf: "baseline",
            paddingHorizontal: 6,
            borderRadius: 3,
            paddingTop: 4,
            paddingBottom: 2,
            marginTop: 4,
          }}
        >
          <Text testID="repoLanguage" isTag>
            {item.language}
          </Text>
        </View>
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
        style={{ margin: 0, marginTop: 10 }}
        onPress={() => {
          Linking.openURL(item.url);
        }}
        text="Open in GitHub"
      />
    )}
  </View>
);

export default RepositoryItem;
