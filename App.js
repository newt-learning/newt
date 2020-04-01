import React, { useEffect, useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { AppLoading } from "expo";
// Context
import {
  Provider as AuthProvider,
  Context as AuthContext
} from "./src/context/AuthContext";
import { Provider as ContentProvider } from "./src/context/ContentContext";
import { Provider as StatsProvider } from "./src/context/StatsContext";
// Screens
import SignInScreen from "./src/screens/SignInScreen";
import HomeScreen from "./src/screens/HomeScreen";
// Hooks
import useFonts from "./src/hooks/useFonts";

const App = () => {
  const {
    state: { isFetching, exists },
    tryLocalSignIn
  } = useContext(AuthContext);
  const [fontLoaded] = useFonts();
  const Stack = createStackNavigator();

  useEffect(() => {
    tryLocalSignIn();
  }, []);

  if (isFetching || !fontLoaded) {
    return <AppLoading />;
  }

  console.log(exists);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {exists ? (
          <Stack.Screen name="Home" component={HomeScreen} />
        ) : (
          <Stack.Screen name="SignIn" component={SignInScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default () => {
  return (
    <AuthProvider>
      <ContentProvider>
        <StatsProvider>
          <App />
        </StatsProvider>
      </ContentProvider>
    </AuthProvider>
  );
};
