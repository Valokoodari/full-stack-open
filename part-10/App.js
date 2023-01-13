import { StatusBar } from "expo-status-bar";
import { ApolloProvider } from "@apollo/client";
import { NativeRouter } from "react-router-native";
import createApolloClient from "./src/utils/apolloClient";
import Main from "./src/components/Main";

const apolloClient = createApolloClient();

const App = () => {
  return (
  <>
    <NativeRouter>
      <ApolloProvider client={apolloClient}>
        <Main />
      </ApolloProvider>
    </NativeRouter>
    <StatusBar style="light" />
  </>
  );
};

export default App;
