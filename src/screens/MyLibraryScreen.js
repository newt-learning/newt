import React, { useState, useContext, useEffect } from "react";
import { ScrollView, StyleSheet } from "react-native";
import _ from "lodash";
// Context
import { Context as ContentContext } from "../context/ContentContext";
// Components
import Loader from "../components/shared/Loader";
import ErrorMessage from "../components/shared/ErrorMessage";
import NoContentMessage from "../components/shared/NoContentMessage";
import ButtonGroup from "../components/shared/ButtonGroup";
import ShelvesSection from "../components/MyLibrary/ShelvesSection";
import TopicsSection from "../components/MyLibrary/TopicsSection";
// Design
import { GRAY_5, YELLOW } from "../design/colors";

const MyLibraryScreen = () => {
  const {
    state: { isFetching, items, errorMessage },
    fetchContent,
  } = useContext(ContentContext);
  // Buttons to switch screens
  const screenSwitchButtons = ["Shelves", "Topics"];
  const [selectedButtonIndex, setSelectedButtonIndex] = useState(0);

  // Fetch content data
  useEffect(() => {
    fetchContent();
  }, []);

  if (isFetching) {
    return <Loader isLoading={isFetching} />;
  }

  // If there's an error message display error message screen
  if (errorMessage) {
    return <ErrorMessage message={errorMessage} onRetry={fetchContent} />;
  }

  // If there's no data and it's not currently being fetched, show the "No Content"
  // message
  if (!isFetching && _.isEmpty(items)) {
    return <NoContentMessage />;
  }

  return (
    <ScrollView style={styles.container}>
      <ButtonGroup
        buttonsArray={screenSwitchButtons}
        selectedIndex={selectedButtonIndex}
        onPress={setSelectedButtonIndex}
        containerStyle={styles.buttonGroup}
        selectedButtonColor={YELLOW}
      />
      {/* Display Shelves or Topics section based on button selected */}
      {selectedButtonIndex === 0 ? (
        <ShelvesSection items={items} />
      ) : (
        <TopicsSection />
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
    borderColor: YELLOW,
    height: 32,
  },
});

export default MyLibraryScreen;
