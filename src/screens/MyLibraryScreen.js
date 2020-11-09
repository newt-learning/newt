import React, { useState, useContext, useEffect } from "react";
import { View, ScrollView, StyleSheet, RefreshControl } from "react-native";
import _ from "lodash";
// API
import { useFetchSeries } from "../api/series";
// Context
import { Context as ContentContext } from "../context/ContentContext";
// Components
import Loader from "../components/shared/Loader";
import ErrorMessage from "../components/shared/ErrorMessage";
import NoContentMessage from "../components/shared/NoContentMessage";
import ButtonGroup from "../components/shared/ButtonGroup";
import ShelvesSection from "../components/MyLibrary/ShelvesSection";
import PlaylistsSection from "../components/MyLibrary/PlaylistsSection";
// Hooks
import useRefresh from "../hooks/useRefresh";
// Design
import { GRAY_2, GRAY_5 } from "../design/colors";

const MyLibraryScreen = () => {
  const { state: contentState, fetchContent } = useContext(ContentContext);

  // Fetch series data
  const {
    status: seriesStatus,
    data: seriesData,
    refetch: fetchSeries,
  } = useFetchSeries();
  // Buttons to switch screens
  const screenSwitchButtons = ["Shelves", "Playlists"];
  const [selectedButtonIndex, setSelectedButtonIndex] = useState(0);

  // Pull to refresh
  const fetchData = () => {
    fetchContent();
    fetchSeries();
  };
  const [refreshing, onPullToRefresh] = useRefresh(fetchData);

  // Fetch content
  useEffect(() => {
    fetchContent();
  }, []);

  if ((contentState.isFetching || seriesStatus === "loading") && !refreshing) {
    return <Loader />;
  }

  // If there's an error message display error message screen
  if (contentState.errorMessage) {
    return (
      <ErrorMessage
        message={contentState.errorMessage}
        onRetry={fetchContent}
      />
    );
  }

  // If there's no data and it's not currently being fetched, show the
  // "No Content" message
  if (!contentState.isFetching && _.isEmpty(contentState.items)) {
    return <NoContentMessage />;
  }

  // Button group to switch between Shelves and Playlists. The reason this is
  // being passed as a prop and not just rendered here is because ScrollView and
  // Flatlist (in PlaylistSection) don't work well together. I'm confident there's
  // a better solution though... for later
  const MyLibraryButtonGroup = () => (
    <ButtonGroup
      buttonsArray={screenSwitchButtons}
      selectedIndex={selectedButtonIndex}
      onPress={setSelectedButtonIndex}
      containerStyle={styles.buttonGroup}
      selectedButtonColor={GRAY_2}
    />
  );

  // Display Shelves or Playlists section based on button selected
  if (selectedButtonIndex === 0) {
    return (
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onPullToRefresh} />
        }
      >
        <MyLibraryButtonGroup />
        <ShelvesSection items={[...contentState.items, ...seriesData]} />
      </ScrollView>
    );
  } else {
    return (
      <View style={styles.container}>
        {/* This component returns a FlatList if there's data, so send the 
        ButtonGroup component to be the FlatList's header. Also needs to be 
        wrapped in a View instead of ScrollView. Need to improve this screen */}
        <PlaylistsSection ButtonGroupHeader={MyLibraryButtonGroup} />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GRAY_5,
  },
  buttonGroup: {
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: GRAY_5,
    height: 32,
  },
});

export default MyLibraryScreen;
