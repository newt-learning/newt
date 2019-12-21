import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { AppLoading } from "expo";
// Screens
import SignInScreen from "./src/screens/SignInScreen";
import HomeScreen from "./src/screens/HomeScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
// Context
import { Provider as AuthProvider } from "./src/context/AuthContext";
// Hooks
import useFonts from "./src/hooks/useFonts";

const switchNavigator = createSwitchNavigator({
  SignIn: SignInScreen,
  mainFlow: createBottomTabNavigator({
    Home: HomeScreen,
    Profile: ProfileScreen
  })
});

const App = createAppContainer(switchNavigator);

export default () => {
  // Load custom fonts
  const [fontLoaded] = useFonts();

  if (!fontLoaded) {
    return <AppLoading />;
  }

  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
};
