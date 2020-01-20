import React from "react";
import { Platform } from "react-native";
import { createStackNavigator } from "react-navigation-stack";
import { NavHeaderTitle } from "../components/Headers";
import { Feather } from "@expo/vector-icons";
// Screens
import HomeScreen from "../screens/HomeScreen";
import BookScreen from "../screens/BookScreen";
// Design
import { OFF_WHITE } from "../design/colors";

const HomeStack = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      headerTitle: <NavHeaderTitle title="newt" displayLogo />,
      // Android headers default to left so add some padding for "logo"
      headerTitleContainerStyle: {
        paddingLeft: Platform.OS === "android" ? 15 : 0
      },
      headerStyle: {
        backgroundColor: OFF_WHITE
      }
    }
  },
  BookScreen: BookScreen
});

HomeStack.navigationOptions = {
  tabBarIcon: ({ tintColor }) => (
    <Feather name="home" size={20} color={tintColor} />
  )
};

export default HomeStack;
