import React, { useContext, useEffect } from "react";
import { ScrollView, StyleSheet } from "react-native";
import _ from "lodash";
// Context
import { Context as ContentContext } from "../context/ContentContext";
// Components
import Shelf from "../components/MyLibrary/Shelf";
import Loader from "../components/shared/Loader";
import ErrorMessage from "../components/shared/ErrorMessage";
import NoContentMessage from "../components/shared/NoContentMessage";
// Design
import { GRAY_5 } from "../design/colors";

const MyLibraryScreen = ({ navigation }) => {
  const {
    state: { isFetching, items, errorMessage },
    fetchContent,
  } = useContext(ContentContext);

  const filterAndOrderContentByShelf = (shelf) => {
    const filteredContent = _.filter(items, (item) => item.shelf === shelf);
    return _.orderBy(filteredContent, "lastUpdated", "desc");
  };

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

  const currentlyLearningItems = filterAndOrderContentByShelf(
    "Currently Learning"
  );
  const wantToLearnItems = filterAndOrderContentByShelf("Want to Learn");
  const finishedLearningItems = filterAndOrderContentByShelf(
    "Finished Learning"
  );

  return (
    <ScrollView style={styles.container}>
      <Shelf
        name="Currently Learning"
        data={currentlyLearningItems.slice(0, 4)}
        numItems={currentlyLearningItems.length}
        onPressTitle={() =>
          navigation.navigate("IndividualShelf", {
            title: "Currently Learning",
          })
        }
      />
      <Shelf
        name="Want to Learn"
        data={wantToLearnItems.slice(0, 4)}
        numItems={wantToLearnItems.length}
        onPressTitle={() =>
          navigation.navigate("IndividualShelf", {
            title: "Want to Learn",
          })
        }
      />
      <Shelf
        name="Finished Learning"
        data={finishedLearningItems.slice(0, 4)}
        numItems={finishedLearningItems.length}
        onPressTitle={() =>
          navigation.navigate("IndividualShelf", {
            title: "Finished Learning",
          })
        }
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GRAY_5,
  },
});

export default MyLibraryScreen;
