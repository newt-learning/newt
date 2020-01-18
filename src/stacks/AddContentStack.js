import React from "react";
import { Platform } from "react-native";
import { createStackNavigator } from "react-navigation-stack";
import { HeaderTitle } from "../components/Header";
import { Feather } from "@expo/vector-icons";
// Screens
import AddContentScreen from "../screens/AddContentScreen";
import AddBookScreen from "../screens/AddBookScreen";
import BookScreen from "../screens/BookScreen";
import ShelfSelectScreen from "../screens/ShelfSelectScreen";
import UpdateProgressScreen from "../screens/UpdateProgressScreen";
// Styling
import { OFF_WHITE } from "../design/colors";

// Stack navigator between Add Content screen and specific content
// (books, videos, articles) screens
const MainStack = createStackNavigator({
  "Add Content": {
    screen: AddContentScreen,
    navigationOptions: {
      headerTitle:
        Platform.OS === "ios" ? (
          <HeaderTitle title="Add Content" />
        ) : (
          "Add Content"
        ),
      headerBackTitle: null,
      headerStyle: {
        backgroundColor: OFF_WHITE
      }
    }
  },
  "Add Book": {
    screen: AddBookScreen,
    navigationOptions: {
      headerTitle:
        Platform.OS === "ios" ? <HeaderTitle title="Add Book" /> : "Add Book",
      headerStyle: {
        backgroundColor: OFF_WHITE
      }
    }
  },
  BookScreen: BookScreen,
  ShelfSelect: ShelfSelectScreen
});

const AddContentStack = createStackNavigator(
  {
    Main: {
      screen: MainStack,
      navigationOptions: {
        headerShown: false,
        headerBackTitle: "Cancel"
      }
    },
    UpdateProgress: {
      screen: UpdateProgressScreen,
      navigationOptions: {
        headerTitle: "Update Progress"
      }
    }
  },
  {
    mode: "modal"
  }
);

// Icon for Add Content button in bottom navigation bar
AddContentStack.navigationOptions = {
  tabBarIcon: ({ tintColor }) => (
    <Feather name="plus-square" size={20} color={tintColor} />
  )
};

export default AddContentStack;
