import React, { useEffect, useContext } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
// Context
import {
  Provider as AuthProvider,
  Context as AuthContext,
} from "./src/context/AuthContext";
import { Provider as ContentProvider } from "./src/context/ContentContext";
import { Provider as StatsProvider } from "./src/context/StatsContext";
// Components
import Loader from "./src/components/shared/Loader";
// Stacks
import MainTabs from "./src/navigators/MainTabs";
// Screens
import SignInScreen from "./src/screens/SignInScreen";
import QuizScreen from "./src/screens/QuizScreen";
// Hooks
import useFonts from "./src/hooks/useFonts";

const App = () => {
  const {
    state: { isFetching, exists },
    tryLocalSignIn,
  } = useContext(AuthContext);
  const [fontLoaded] = useFonts();
  const Stack = createStackNavigator();

  useEffect(() => {
    tryLocalSignIn();
  }, []);

  if (isFetching || !fontLoaded) {
    return <Loader />;
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator>
          {exists ? (
            <>
              {/* Screens part of bottom tab navigation */}
              <Stack.Screen
                name="Main"
                component={MainTabs}
                options={{ headerShown: false }}
              />
              {/* Don't want the bottom tabs for the Quiz Screen */}
              <Stack.Screen
                name="QuizScreen"
                component={QuizScreen}
                options={{ headerShown: false }}
              />
            </>
          ) : (
            <Stack.Screen
              name="SignIn"
              component={SignInScreen}
              options={{ headerShown: false, animationEnabled: false }}
            />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
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
