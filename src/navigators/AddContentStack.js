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
import AddToPlaylistScreen from "../screens/AddToPlaylistScreen";
import PlaylistScreen from "../screens/PlaylistScreen";
import CreatePlaylistScreen from "../screens/CreatePlaylistScreen";
import EditPlaylistScreen from "../screens/EditPlaylistScreen";
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
        name="Playlist"
        component={PlaylistScreen}
        options={({ route }) => ({
          title: route.params.playlistInfo.name,
          headerTitle: () => (
            <NavHeaderTitle title={route.params.playlistInfo.name} />
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
        name="CreatePlaylist"
        component={CreatePlaylistScreen}
        options={{
          title: "Create Playlist",
          ...SCREEN_OPTIONS.presentationModalOptions,
        }}
      />
      <Stack.Screen
        name="AddToPlaylist"
        component={AddToPlaylistScreen}
        options={{
          title: "Add to Playlist",
          ...SCREEN_OPTIONS.presentationModalOptions,
        }}
      />
      <Stack.Screen
        name="EditPlaylist"
        component={EditPlaylistScreen}
        options={{
          title: "Edit Playlist",
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
