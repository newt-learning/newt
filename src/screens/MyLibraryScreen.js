import React, { useState, useContext, useEffect } from "react";
import { ScrollView, StyleSheet } from "react-native";
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
// Design
import { GRAY_2, GRAY_5 } from "../design/colors";

const MyLibraryScreen = () => {
  const { state: contentState, fetchContent } = useContext(ContentContext);
  const { state: topicsState, fetchTopics, createTopic } = useContext(
    TopicsContext
  );
  // Buttons to switch screens
  const screenSwitchButtons = ["Shelves", "Topics"];
  const [selectedButtonIndex, setSelectedButtonIndex] = useState(0);

  // Fetch content and topics data
  useEffect(() => {
    fetchContent();
    fetchTopics();
  }, []);

  if (contentState.isFetching || topicsState.isFetching) {
    return <Loader />;
  }

  // If there's an error message display error message screen
  if (contentState.errorMessage) {
    return (
      <ErrorMessage
        message={contentContext.state.errorMessage}
        onRetry={contentContext.fetchContent}
      />
    );
  }

  // If there's no data and it's not currently being fetched, show the
  // "No Content" message
  if (!contentState.isFetching && _.isEmpty(contentState.items)) {
    return <NoContentMessage />;
  }

  return (
    <ScrollView style={styles.container}>
      <ButtonGroup
        buttonsArray={screenSwitchButtons}
        selectedIndex={selectedButtonIndex}
        onPress={setSelectedButtonIndex}
        containerStyle={styles.buttonGroup}
        selectedButtonColor={GRAY_2}
      />
      {/* Display Shelves or Topics section based on button selected */}
      {selectedButtonIndex === 0 ? (
        <ShelvesSection items={contentState.items} />
      ) : (
        <TopicsSection items={topicsState.items} onCreateTopic={createTopic} />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GRAY_5,
  },
  buttonGroup: {
    marginTop: 10,
    backgroundColor: GRAY_5,
    height: 32,
  },
});

export default MyLibraryScreen;
