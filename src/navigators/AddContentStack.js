import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavHeaderTitle } from "../components/shared/Headers";
// Screens
import AddContentScreen from "../screens/AddContentScreen";
import AddBookScreen from "../screens/AddBookScreen";
import BookScreen from "../screens/BookScreen";
import ShelfSelectScreen from "../screens/ShelfSelectScreen";
import UpdateProgressScreen from "../screens/UpdateProgressScreen";
import AddToTopicScreen from "../screens/AddToTopicScreen";
import TopicScreen from "../screens/TopicScreen";
import CreateTopicScreen from "../screens/CreateTopicScreen";
import EditTopicScreen from "../screens/EditTopicScreen";
import AddEditDatesReadScreen from "../screens/AddEditDatesReadScreen";
// Helpers
import SCREEN_OPTIONS from "./screenOptions";
// Design
import { OFF_WHITE } from "../design/colors";

const Stack = createStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerStyle: { backgroundColor: OFF_WHITE } }}
    >
      <Stack.Screen
        name="Add Content"
        component={AddContentScreen}
        options={{
          title: "Add Content",
          headerTitle: () => <NavHeaderTitle title="Add Content" />,
        }}
      />
      <Stack.Screen
        name="Add Book"
        component={AddBookScreen}
        options={{
          title: "Add Book",
          headerTitle: () => <NavHeaderTitle title="Add Book" />,
        }}
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
      <Stack.Screen
        name="Topic"
        component={TopicScreen}
        options={({ route }) => ({
          title: route.params.topicInfo.name,
          headerTitle: () => (
            <NavHeaderTitle title={route.params.topicInfo.name} />
          ),
        })}
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
          ...SCREEN_OPTIONS.presentationModalOptions,
        }}
      />
      <Stack.Screen
        name="CreateTopic"
        component={CreateTopicScreen}
        options={{
          title: "Create Topic",
          ...SCREEN_OPTIONS.presentationModalOptions,
        }}
      />
      <Stack.Screen
        name="AddToTopic"
        component={AddToTopicScreen}
        options={{
          title: "Add to Topic",
          ...SCREEN_OPTIONS.presentationModalOptions,
        }}
      />
      <Stack.Screen
        name="EditTopic"
        component={EditTopicScreen}
        options={{
          title: "Edit Topic",
          ...SCREEN_OPTIONS.presentationModalOptions,
        }}
      />
      <Stack.Screen
        name="AddEditDatesRead"
        component={AddEditDatesReadScreen}
        options={{
          title: "Dates Read",
          ...SCREEN_OPTIONS.presentationModalOptions,
        }}
      />
    </Stack.Navigator>
  );
};

export default RootStack;
