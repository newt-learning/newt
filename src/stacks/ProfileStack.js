import React from "react";
import { Platform } from "react-native";
import { createStackNavigator } from "react-navigation-stack";
import { HeaderTitle } from "../components/Header";
import { Feather } from "@expo/vector-icons";
// Screens
import ProfileScreen from "../screens/ProfileScreen";
// Design
import { OFF_WHITE } from "../design/colors";

const ProfileStack = createStackNavigator({
  Profile: {
    screen: ProfileScreen,
    navigationOptions: {
      headerTitle:
        Platform.OS === "ios" ? <HeaderTitle title="Profile" /> : "Profile",
      headerStyle: {
        backgroundColor: OFF_WHITE
      }
    }
  }
});

ProfileStack.navigationOptions = {
  tabBarIcon: ({ tintColor }) => (
    <Feather name="user" size={20} color={tintColor} />
  )
};

export default ProfileStack;
