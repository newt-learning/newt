import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createStackNavigator } from "react-navigation-stack";
import { AppLoading } from "expo";
import { setNavigator } from "./src/refs/navigationRef";
import { Feather } from "@expo/vector-icons";
// Screens
import ResolveAuth from "./src/screens/ResolveAuth";
import SignInScreen from "./src/screens/SignInScreen";
import HomeScreen from "./src/screens/HomeScreen";
import MyLibraryScreen from "./src/screens/MyLibraryScreen";
import AddContentScreen from "./src/screens/AddContentScreen";
import AddBookScreen from "./src/screens/AddBookScreen";
import BookScreen from "./src/screens/BookScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
// Components
import { HeaderTitle } from "./src/components/Header";
// Context
import { Provider as AuthProvider } from "./src/context/AuthContext";
// Hooks
import useFonts from "./src/hooks/useFonts";
// Styling
import { OFF_BLACK, NEWT_BLUE } from "./src/design/colors";

// Stack navigator between Add Content screen and specific content
// (books, videos, articles) screens
const addContentFlow = createStackNavigator({
  "Add Content": {
    screen: AddContentScreen,
    navigationOptions: {
      headerTitle:
        Platform.OS === "ios" ? (
          <HeaderTitle title="Add Content" />
        ) : (
          "Add Content"
        ),
      headerBackTitle: null
    }
  },
  "Add Book": {
    screen: AddBookScreen,
    navigationOptions: {
      headerTitle:
        Platform.OS === "ios" ? <HeaderTitle title="Add Book" /> : "Add Book"
    }
  },
  BookScreen: BookScreen
});

// Icon for Add Content button in bottom navigation bar
addContentFlow.navigationOptions = {
  tabBarIcon: ({ tintColor }) => (
    <Feather name="plus-square" size={20} color={tintColor} />
  )
};

const switchNavigator = createSwitchNavigator({
  ResolveAuth,
  SignIn: SignInScreen,
  mainFlow: createBottomTabNavigator(
    {
      Home: HomeScreen,
      "My Library": MyLibraryScreen,
      "Add Content": addContentFlow,
      Profile: ProfileScreen
    },
    {
      tabBarOptions: {
        activeTintColor: NEWT_BLUE,
        inactiveTintColor: OFF_BLACK
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
      <App ref={navigator => setNavigator(navigator)} />
    </AuthProvider>
  );
};
