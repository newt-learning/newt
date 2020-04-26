import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
// Components
import { NavHeaderTitle } from "../components/shared/Headers";
// Screens
import StatsScreen from "../screens/StatsScreen";
import StatsVisualsScreen from "../screens/StatsVisualsScreen";
import { OFF_WHITE } from "../design/colors";

const Stack = createStackNavigator();

const StatsStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerStyle: { backgroundColor: OFF_WHITE } }}
    >
      <Stack.Screen
        name="Stats"
        component={StatsScreen}
        options={{
          title: "Learning Stats",
          headerTitle: () => <NavHeaderTitle title="Learning Stats" />,
        }}
      />
      <Stack.Screen
        name="StatsVisuals"
        component={StatsVisualsScreen}
        options={({ route }) => ({
          title: route.params.title,
          headerTitle: () => <NavHeaderTitle title={route.params.title} />,
          headerBackTitle: "Back",
        })}
      />
    </Stack.Navigator>
  );
};

export default StatsStack;
