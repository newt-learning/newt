import React, { useContext, useEffect } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  ActivityIndicator
} from "react-native";
import _ from "lodash";
import { Feather } from "@expo/vector-icons";
// Context
import { Context as ContentContext } from "../context/ContentContext";
// Components
import Shelf from "../components/Shelf";
import Loader from "../components/Loader";
// Design
import { GRAY_5 } from "../design/colors";

const MyLibraryScreen = ({ navigation }) => {
  const {
    state: { isFetching, items },
    fetchContent
  } = useContext(ContentContext);

  const filterContentByShelf = shelf => {
    return _.filter(items, item => item.shelf === shelf);
  };

  // Fetch content data
  useEffect(() => {
    fetchContent();
  }, []);

  if (isFetching) {
    return <Loader isLoading={isFetching} />;
  }

  const currentlyLearningItems = filterContentByShelf("Currently Learning");
  const wantToLearnItems = filterContentByShelf("Want to Learn");
  const finishedLearningItems = filterContentByShelf("Finished Learning");

  return (
    <ScrollView style={styles.container}>
      <Shelf
        name="Currently Learning"
        data={currentlyLearningItems.slice(0, 4)}
        numItems={currentlyLearningItems.length}
        onPressTitle={() =>
          navigation.navigate("IndividualShelf", {
            title: "Currently Learning"
          })
        }
      />
      <Shelf
        name="Want to Learn"
        data={wantToLearnItems.slice(0, 4)}
        numItems={wantToLearnItems.length}
        onPressTitle={() =>
          navigation.navigate("IndividualShelf", {
            title: "Want to Learn"
          })
        }
      />
      <Shelf
        name="Finished Learning"
        data={finishedLearningItems.slice(0, 4)}
        numItems={finishedLearningItems.length}
        onPressTitle={() =>
          navigation.navigate("IndividualShelf", {
            title: "Finished Learning"
          })
        }
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GRAY_5
  }
});

export default MyLibraryScreen;
