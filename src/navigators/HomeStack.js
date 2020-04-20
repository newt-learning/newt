import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
// Screens
import HomeScreen from "../screens/HomeScreen";
import BookScreen from "../screens/BookScreen";

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="BookScreen" component={BookScreen} />
    </Stack.Navigator>
  );
};

export default HomeStack;
