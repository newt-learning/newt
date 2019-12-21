import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { AppLoading } from "expo";
import { setNavigator } from "./src/refs/navigationRef";
// Screens
import ResolveAuth from "./src/screens/ResolveAuth";
import SignInScreen from "./src/screens/SignInScreen";
import HomeScreen from "./src/screens/HomeScreen";
import AddContent from "./src/screens/AddContent";
import ProfileScreen from "./src/screens/ProfileScreen";
// Context
import { Provider as AuthProvider } from "./src/context/AuthContext";
// Hooks
import useFonts from "./src/hooks/useFonts";

const switchNavigator = createSwitchNavigator({
  ResolveAuth,
  SignIn: SignInScreen,
  mainFlow: createBottomTabNavigator({
    Home: HomeScreen,
    "Add Content": AddContent,
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
      <App ref={navigator => setNavigator(navigator)} />
    </AuthProvider>
  );
};
