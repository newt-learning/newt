import React from "react";
import { Platform } from "react-native";
import { createStackNavigator } from "react-navigation-stack";
import { HeaderTitle } from "../components/Header";
import { Feather } from "@expo/vector-icons";
// Screens
import AddContentScreen from "../screens/AddContentScreen";
import AddBookScreen from "../screens/AddBookScreen";
import BookScreen from "../screens/BookScreen";
import AddToMyLibraryScreen from "../screens/AddToMyLibraryScreen";

// Stack navigator between Add Content screen and specific content
// (books, videos, articles) screens
const AddContentStack = createStackNavigator({
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
  BookScreen: BookScreen,
  AddToMyLibrary: AddToMyLibraryScreen
});

// Icon for Add Content button in bottom navigation bar
AddContentStack.navigationOptions = {
  tabBarIcon: ({ tintColor }) => (
    <Feather name="plus-square" size={20} color={tintColor} />
  )
};

export default AddContentStack;