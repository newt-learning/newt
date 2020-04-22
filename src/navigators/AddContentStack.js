import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavHeaderTitle } from "../components/Headers";
// Screens
import AddContentScreen from "../screens/AddContentScreen";
import AddBookScreen from "../screens/AddBookScreen";
import BookScreen from "../screens/BookScreen";
import ShelfSelectScreen from "../screens/ShelfSelectScreen";
// Design
import { OFF_WHITE } from "../design/colors";

const Stack = createStackNavigator();

const AddContentStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerStyle: { backgroundColor: OFF_WHITE } }}
    >
      <Stack.Screen
        name="Add Content"
        component={AddContentScreen}
        options={{
          headerTitle: () => <NavHeaderTitle title="Add Content" />,
          headerBackTitle: "Add Content",
        }}
      />
      <Stack.Screen name="Add Book" component={AddBookScreen} />
      <Stack.Screen
        name="BookScreen"
        component={BookScreen}
        options={{ title: null }}
      />
      <Stack.Screen
        name="ShelfSelect"
        component={ShelfSelectScreen}
        options={{ title: null }}
      />
    </Stack.Navigator>
  );
};

export default AddContentStack;
