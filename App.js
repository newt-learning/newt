import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { AppLoading } from "expo";
import { setNavigator } from "./src/refs/navigationRef";
// Stacks
import MyLibraryStack from "./src/stacks/MyLibraryStack";
import AddContentStack from "./src/stacks/AddContentStack";
// Screens
import ResolveAuth from "./src/screens/ResolveAuth";
import SignInScreen from "./src/screens/SignInScreen";
import HomeScreen from "./src/screens/HomeScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
// Context
import { Provider as AuthProvider } from "./src/context/AuthContext";
import { Provider as ContentProvider } from "./src/context/ContentContext";
// Hooks
import useFonts from "./src/hooks/useFonts";
// Styling
import { OFF_BLACK, OFF_WHITE, NEWT_BLUE } from "./src/design/colors";

const switchNavigator = createSwitchNavigator({
  ResolveAuth,
  SignIn: SignInScreen,
  mainFlow: createBottomTabNavigator(
    {
      Home: HomeScreen,
      "My Library": MyLibraryStack,
      "Add Content": AddContentStack,
      Profile: ProfileScreen
    },
    {
      tabBarOptions: {
        activeTintColor: NEWT_BLUE,
        inactiveTintColor: OFF_BLACK,
        style: {
          backgroundColor: OFF_WHITE
        }
      }
    }
  )
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
      <ContentProvider>
        <App ref={navigator => setNavigator(navigator)} />
      </ContentProvider>
    </AuthProvider>
  );
};
