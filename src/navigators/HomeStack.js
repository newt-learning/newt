import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavHeaderTitle } from "../components/Headers";
// Screens
import HomeScreen from "../screens/HomeScreen";
import BookScreen from "../screens/BookScreen";
import ShelfSelectScreen from "../screens/ShelfSelectScreen";
// Design
import { OFF_WHITE } from "../design/colors";

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerStyle: { backgroundColor: OFF_WHITE } }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerTitle: <NavHeaderTitle title="newt" displayLogo />,
        }}
      />
      <Stack.Screen
        name="BookScreen"
        component={BookScreen}
        options={{
          title: null,
          headerBackTitle: "Back",
        }}
      />
      <Stack.Screen
        name="ShelfSelect"
        component={ShelfSelectScreen}
        options={{ title: null }}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
