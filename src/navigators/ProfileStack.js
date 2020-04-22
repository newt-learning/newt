import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavHeaderTitle } from "../components/Headers";
// Screens
import ProfileScreen from "../screens/ProfileScreen";
import { OFF_WHITE } from "../design/colors";

const Stack = createStackNavigator();

const ProfileStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerStyle: { backgroundColor: OFF_WHITE } }}
    >
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerTitle: () => <NavHeaderTitle title="Profile" />,
        }}
      />
    </Stack.Navigator>
  );
};

export default ProfileStack;
