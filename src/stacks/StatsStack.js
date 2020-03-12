import React from "react";
import { Platform } from "react-native";
import { createStackNavigator } from "react-navigation-stack";
// Components
import { NavHeaderTitle } from "../components/Headers";
// Screens
import StatsScreen from "../screens/StatsScreen";
// Design
import { OFF_WHITE } from "../design/colors";
import { Feather } from "@expo/vector-icons";

const StatsStack = createStackNavigator({
  Stats: {
    screen: StatsScreen,
    navigationOptions: {
      headerTitle:
        Platform.OS === "ios" ? (
          <NavHeaderTitle title="Learning Stats" />
        ) : (
          "Stats"
        ),
      headerStyle: {
        backgroundColor: OFF_WHITE
      }
    }
  }
});

StatsStack.navigationOptions = {
  tabBarIcon: ({ tintColor }) => (
    <Feather name="bar-chart" size={20} color={tintColor} />
  )
};

export default StatsStack;
