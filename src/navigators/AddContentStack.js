import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavHeaderTitle } from "../components/shared/Headers";
// Screens
import AddContentScreen from "../screens/AddContentScreen";
import AddBookScreen from "../screens/AddBookScreen";
import BookScreen from "../screens/BookScreen";
import AddVideoScreen from "../screens/AddVideoScreen";
import VideoScreen from "../screens/VideoScreen";
import ShelfSelectScreen from "../screens/ShelfSelectScreen";
import UpdateProgressScreen from "../screens/UpdateProgressScreen";
import AddToTopicScreen from "../screens/AddToTopicScreen";
import TopicScreen from "../screens/TopicScreen";
import CreateTopicScreen from "../screens/CreateTopicScreen";
import EditTopicScreen from "../screens/EditTopicScreen";
import AddEditDatesScreen from "../screens/AddEditDatesScreen";
import QuizScreen from "../screens/QuizScreen";
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
        name="AddVideo"
        component={AddVideoScreen}
        options={{
          title: "Add Video",
          headerTitle: () => <NavHeaderTitle title="Add Video" />,
        }}
      />
      <Stack.Screen
        name="BookScreen"
        component={BookScreen}
        options={{ title: null }}
      />
      <Stack.Screen
        name="VideoScreen"
        component={VideoScreen}
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
      <Stack.Screen
        name="QuizScreen"
        component={QuizScreen}
        options={{ headerShown: false }}
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
        name="AddEditDates"
        component={AddEditDatesScreen}
        options={{
          ...SCREEN_OPTIONS.presentationModalOptions,
        }}
      />
    </Stack.Navigator>
  );
};

export default RootStack;
