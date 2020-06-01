import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
// Components
import { NavHeaderTitle } from "../components/shared/Headers";
// Screens
import StatsScreen from "../screens/StatsScreen";
import StatsVisualsScreen from "../screens/StatsVisualsScreen";
import CreateChallengeScreen from "../screens/CreateChallengeScreen";
import ChallengeScreen from "../screens/ChallengeScreen";
import EditChallengeScreen from "../screens/EditChallengeScreen";
// Design
import { OFF_WHITE } from "../design/colors";
// Helpers
import SCREEN_OPTIONS from "./screenOptions";

const Stack = createStackNavigator();

const MainStack = () => {
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
      <Stack.Screen
        name="Challenge"
        component={ChallengeScreen}
        options={{
          title: "Reading Challenge",
          headerTitle: () => <NavHeaderTitle title="Reading Challenge" />,
          headerBackTitle: "Back",
        }}
      />
    </Stack.Navigator>
  );
};

const RootStack = () => {
  return (
    <Stack.Navigator
      mode="modal"
      screenOptions={{ headerStyle: { backgroundColor: OFF_WHITE } }}
    >
      <Stack.Screen
        name="Main"
        component={MainStack}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CreateChallenge"
        component={CreateChallengeScreen}
        options={{
          title: "Create Reading Challenge",
          ...SCREEN_OPTIONS.presentationModalOptions,
        }}
      />
      <Stack.Screen
        name="EditChallenge"
        component={EditChallengeScreen}
        options={{
          title: "Edit Challenge",
          ...SCREEN_OPTIONS.presentationModalOptions,
        }}
      />
    </Stack.Navigator>
  );
};

export default RootStack;
