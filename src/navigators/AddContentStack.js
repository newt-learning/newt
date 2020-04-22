import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavHeaderTitle } from "../components/Headers";
// Screens
import AddContentScreen from "../screens/AddContentScreen";
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
          headerTitle: <NavHeaderTitle title="Add Content" />,
        }}
      />
    </Stack.Navigator>
  );
};

export default AddContentStack;
