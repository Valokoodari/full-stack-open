import "dotenv/config";

export default {
  name: "rate-repository-app",
  extra: {
    apolloUri: process.env.APOLLO_URI,
    eas: {
      projectId: process.env.EAS_PROJECT_ID,
    },
  },
  android: {
    package: "com.valokoodari.rateRepositoryApp",
  },
};
