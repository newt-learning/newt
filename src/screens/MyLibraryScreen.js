import React, { useState, useContext, useEffect } from "react";
import { View, ScrollView, StyleSheet, RefreshControl } from "react-native";
import _ from "lodash";
// Context
import { Context as ContentContext } from "../context/ContentContext";
import { Context as TopicsContext } from "../context/TopicsContext";
// Components
import Loader from "../components/shared/Loader";
import ErrorMessage from "../components/shared/ErrorMessage";
import NoContentMessage from "../components/shared/NoContentMessage";
import ButtonGroup from "../components/shared/ButtonGroup";
import ShelvesSection from "../components/MyLibrary/ShelvesSection";
import TopicsSection from "../components/MyLibrary/TopicsSection";
// Hooks
import useRefresh from "../hooks/useRefresh";
// Design
import { GRAY_2, GRAY_5 } from "../design/colors";

const MyLibraryScreen = () => {
  const { state: contentState, fetchContent } = useContext(ContentContext);
  const { state: topicsState, fetchTopics } = useContext(TopicsContext);
  // Buttons to switch screens
  const screenSwitchButtons = ["Shelves", "Topics"];
  const [selectedButtonIndex, setSelectedButtonIndex] = useState(0);

  // Pull to refresh
  const fetchData = () => {
    fetchContent();
    fetchTopics();
  };
  const [refreshing, onPullToRefresh] = useRefresh(fetchData);

  // Fetch content and topics data
  useEffect(() => {
    fetchContent();
    fetchTopics();
  }, []);

  if ((contentState.isFetching || topicsState.isFetching) && !refreshing) {
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

  // Button group to switch between Shelves and Topics
  const MyLibraryButtonGroup = () => (
    <ButtonGroup
      buttonsArray={screenSwitchButtons}
      selectedIndex={selectedButtonIndex}
      onPress={setSelectedButtonIndex}
      containerStyle={styles.buttonGroup}
      selectedButtonColor={GRAY_2}
    />
  );

  // Display Shelves or Topics section based on button selected
  if (selectedButtonIndex === 0) {
    return (
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onPullToRefresh} />
        }
      >
        <MyLibraryButtonGroup />
        <ShelvesSection items={contentState.items} />
      </ScrollView>
    );
  } else {
    return (
      <View style={styles.container}>
        {/* This component returns a FlatList if there's data, so send the 
        ButtonGroup component to be the FlatList's header. Also needs to be 
        wrapped in a View instead of ScrollView. Need to improve this screen */}
        <TopicsSection
          items={topicsState.items}
          ButtonGroupHeader={MyLibraryButtonGroup}
        />
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
