import { StatusBar } from "expo-status-bar";
import { ApolloProvider } from "@apollo/client";
import { NativeRouter } from "react-router-native";
import AuthStorageContext from "./src/contexts/AuthStorageContext";
import createApolloClient from "./src/utils/apolloClient";
import AuthStorage from "./src/utils/authStorage";
import Main from "./src/components/Main";

const authStorage = new AuthStorage();
const apolloClient = createApolloClient(authStorage);

const App = () => {
  return (
    <>
      <NativeRouter>
        <ApolloProvider client={apolloClient}>
          <AuthStorageContext.Provider value={authStorage}>
            <Main />
          </AuthStorageContext.Provider>
        </ApolloProvider>
      </NativeRouter>
      <StatusBar style="light" />
    </>
  );
};

export default App;
