import React from "react";
import { Platform } from "react-native";
import { createStackNavigator } from "react-navigation-stack";
import { HeaderTitle } from "../components/Header";
import { Feather } from "@expo/vector-icons";
// Screens
import HomeScreen from "../screens/HomeScreen";
// Design
import { OFF_WHITE } from "../design/colors";

const HomeStack = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      headerTitle: <HeaderTitle title="newt" displayLogo />,
      // Android headers default to left so add some padding for "logo"
      headerTitleContainerStyle: {
        paddingLeft: Platform.OS === "android" ? 15 : 0
      },
      headerStyle: {
        backgroundColor: OFF_WHITE
      }
    }
  }
});

HomeStack.navigationOptions = {
  tabBarIcon: ({ tintColor }) => (
    <Feather name="home" size={20} color={tintColor} />
  )
};

export default HomeStack;
