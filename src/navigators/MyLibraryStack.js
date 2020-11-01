import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavHeaderTitle } from "../components/shared/Headers";
// Screens
import MyLibraryScreen from "../screens/MyLibraryScreen";
import IndividualShelfScreen from "../screens/IndividualShelfScreen";
import BookScreen from "../screens/BookScreen";
import VideoScreen from "../screens/VideoScreen";
import SeriesScreen from "../screens/SeriesScreen";
import ShelfSelectScreen from "../screens/ShelfSelectScreen";
import UpdateProgressScreen from "../screens/UpdateProgressScreen";
import CreatePlaylistScreen from "../screens/CreatePlaylistScreen";
import PlaylistScreen from "../screens/PlaylistScreen";
import AddToTopicScreen from "../screens/AddToTopicScreen";
import EditTopicScreen from "../screens/EditTopicScreen";
import AddEditDatesScreen from "../screens/AddEditDatesScreen";
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
        name="VideoScreen"
        component={VideoScreen}
        options={{ title: null }}
      />
      <Stack.Screen
        name="SeriesScreen"
        component={SeriesScreen}
        options={{ title: null }}
      />
      <Stack.Screen
        name="ShelfSelect"
        component={ShelfSelectScreen}
        options={{ title: null }}
      />
      <Stack.Screen name="Playlist" component={PlaylistScreen} />
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
        name="CreatePlaylist"
        component={CreatePlaylistScreen}
        options={{
          title: "Create Playlist",
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
