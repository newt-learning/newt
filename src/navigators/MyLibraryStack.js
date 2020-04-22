import React from "react";
import { Platform } from "react-native";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import { NavHeaderTitle } from "../components/Headers";
import { MaterialIcons } from "@expo/vector-icons";
// Screens
import MyLibraryScreen from "../screens/MyLibraryScreen";
import IndividualShelfScreen from "../screens/IndividualShelfScreen";
import BookScreen from "../screens/BookScreen";
import ShelfSelectScreen from "../screens/ShelfSelectScreen";
import UpdateProgressScreen from "../screens/UpdateProgressScreen";
// Design
import { OFF_WHITE } from "../design/colors";

const Stack = createStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerStyle: { backgroundColor: OFF_WHITE } }}
    >
      <Stack.Screen
        name="My Library"
        component={MyLibraryScreen}
        options={{ headerTitle: () => <NavHeaderTitle title="My Library" /> }}
      />
      <Stack.Screen
        name="IndividualShelf"
        component={IndividualShelfScreen}
        options={({ route }) => ({
          title: route.params.title,
          headerTitle: () => <NavHeaderTitle title={route.params.title} />,
          headerBackTitleVisible: false,
        })}
      />
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
        name="UpdateProgress"
        component={UpdateProgressScreen}
        options={{
          title: "Update Progress",
          headerStatusBarHeight: 15, // Reduce default height
          headerBackTitle: "Cancel",
          headerBackTitleStyle: { paddingLeft: 15 },
          headerBackImage: () => {
            // For iOS, don't show 'Back' chevron icon (show nothing). For
            // Android, show 'Close' icon
            return Platform.OS === "ios" ? null : (
              <MaterialIcons name="close" size={24} />
            );
          },
          cardOverlayEnabled: true,
          cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS,
        }}
      />
    </Stack.Navigator>
  );
};

export default RootStack;
