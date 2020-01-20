import React from "react";
import { Platform } from "react-native";
import { createStackNavigator } from "react-navigation-stack";
import { NavHeaderTitle } from "../components/Headers";
import { Feather } from "@expo/vector-icons";
// Screens
import MyLibraryScreen from "../screens/MyLibraryScreen";
import IndividualShelfScreen from "../screens/IndividualShelfScreen";
import BookScreen from "../screens/BookScreen";
import ShelfSelectScreen from "../screens/ShelfSelectScreen";
import UpdateProgressScreen from "../screens/UpdateProgressScreen";
// Styling
import { OFF_WHITE } from "../design/colors";

const MainStack = createStackNavigator({
  "My Library": {
    screen: MyLibraryScreen,
    navigationOptions: {
      headerTitle:
        Platform.OS === "ios" ? (
          <NavHeaderTitle title="My Library" />
        ) : (
          "My Library"
        ),
      headerStyle: {
        backgroundColor: OFF_WHITE
      }
    }
  },
  IndividualShelf: IndividualShelfScreen,
  BookScreen: BookScreen,
  ShelfSelect: ShelfSelectScreen
});

const MyLibraryStack = createStackNavigator(
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

MyLibraryStack.navigationOptions = {
  tabBarIcon: ({ tintColor }) => (
    <Feather name="book-open" size={20} color={tintColor} />
  )
};

export default MyLibraryStack;
