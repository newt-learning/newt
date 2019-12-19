import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
// Screens
import SignInScreen from "./src/screens/SignInScreen";
import HomeScreen from "./src/screens/HomeScreen";
import ProfileScreen from "./src/screens/ProfileScreen";

const switchNavigator = createSwitchNavigator({
  SignIn: SignInScreen,
  mainFlow: createBottomTabNavigator({
    Home: HomeScreen,
    Profile: ProfileScreen
  })
});

const App = createAppContainer(switchNavigator);

export default App;
