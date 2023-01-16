import { NativeRouter } from "react-router-native";
import { render } from "@testing-library/react-native";
import { RepositoryListContainer } from "../../components/RepositoryList";

const repositories = {
  totalCount: 8,
  pageInfo: {
    hasNextPage: true,
    endCursor: "WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==",
    startCursor: "WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd",
  },
  edges: [
    {
      node: {
        id: "jaredpalmer.formik",
        fullName: "jaredpalmer/formik",
        description: "Build forms in React, without the tears",
        language: "TypeScript",
        forksCount: 1619,
        stargazersCount: 21856,
        ratingAverage: 88,
        reviewCount: 3,
        ownerAvatarUrl: "https://avatars2.githubusercontent.com/u/4060187?v=4",
      },
      cursor: "WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd",
    },
    {
      node: {
        id: "async-library.react-async",
        fullName: "async-library/react-async",
        description: "Flexible promise-based React data loader",
        language: "JavaScript",
        forksCount: 69,
        stargazersCount: 1760,
        ratingAverage: 72,
        reviewCount: 3,
        ownerAvatarUrl: "https://avatars1.githubusercontent.com/u/54310907?v=4",
      },
      cursor: "WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==",
    },
  ],
};

const formatNumber = (n) => {
  return n >= 1000 ? (n / 1000).toFixed(1) + "k" : n;
};

describe("RepositoryList", () => {
  describe("RepositoryListContainer", () => {
    it("renders the correct amount of repository items", () => {
      const { getAllByTestId } = render(
        <NativeRouter>
          <RepositoryListContainer repositories={repositories} />
        </NativeRouter>
      );

      const repositoryItems = getAllByTestId("repositoryItem");
      expect(repositoryItems).toHaveLength(2);
    });

    it("renders repository information correctly", () => {
      const { getAllByTestId } = render(
        <NativeRouter>
          <RepositoryListContainer repositories={repositories} />
        </NativeRouter>
      );

      const fullNames = getAllByTestId("repoFullName");
      expect(fullNames[0]).toHaveTextContent(
        repositories.edges[0].node.fullName
      );
      expect(fullNames[1]).toHaveTextContent(
        repositories.edges[1].node.fullName
      );

      const descriptions = getAllByTestId("repoDescription");
      expect(descriptions[0]).toHaveTextContent(
        repositories.edges[0].node.description
      );
      expect(descriptions[1]).toHaveTextContent(
        repositories.edges[1].node.description
      );

      const languages = getAllByTestId("repoLanguage");
      expect(languages[0]).toHaveTextContent(
        repositories.edges[0].node.language
      );
      expect(languages[1]).toHaveTextContent(
        repositories.edges[1].node.language
      );

      const forks = getAllByTestId("repoStatForks");
      expect(forks[0]).toHaveTextContent(
        formatNumber(repositories.edges[0].node.forksCount)
      );
      expect(forks[1]).toHaveTextContent(
        formatNumber(repositories.edges[1].node.forksCount)
      );

      const stars = getAllByTestId("repoStatStars");
      expect(stars[0]).toHaveTextContent(
        formatNumber(repositories.edges[0].node.stargazersCount)
      );
      expect(stars[1]).toHaveTextContent(
        formatNumber(repositories.edges[1].node.stargazersCount)
      );

      const ratings = getAllByTestId("repoStatRating");
      expect(ratings[0]).toHaveTextContent(
        repositories.edges[0].node.ratingAverage
      );
      expect(ratings[1]).toHaveTextContent(
        repositories.edges[1].node.ratingAverage
      );

      const reviews = getAllByTestId("repoStatReviews");
      expect(reviews[0]).toHaveTextContent(
        formatNumber(repositories.edges[0].node.reviewCount)
      );
      expect(reviews[1]).toHaveTextContent(
        formatNumber(repositories.edges[1].node.reviewCount)
      );
    });
  });
});
