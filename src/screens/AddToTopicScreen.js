import React, { useContext, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
// Context
import { Context as TopicsContext } from "../context/TopicsContext";
// Components
import Loader from "../components/shared/Loader";
import ListSelect from "../components/shared/ListSelect";
import { BOLD, FS20 } from "../design/typography";
import { OFF_BLACK } from "../design/colors";
// Hooks
import useMultiSelectCheckbox from "../hooks/useMultiSelectCheckbox";
// Helpers
import { initializeMultiSelectCheckbox } from "../helpers/screenHelpers";

const AddToTopicScreen = ({ route }) => {
  const {
    state: { isFetching, items },
    fetchTopics,
  } = useContext(TopicsContext);

  // Array of topic ids that the content (book, etc.) is already in
  const { contentTopics } = route.params;

  useEffect(() => {
    fetchTopics();
  }, []);

  // Create multi-select list
  const [topicsList, toggleTopicsList] = useMultiSelectCheckbox(
    initializeMultiSelectCheckbox(items, contentTopics)
  );

  if (isFetching) {
    return <Loader />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Select Topic(s)</Text>
      {topicsList.map((topic, index) => (
        <ListSelect
          name={topic.name}
          checked={topic.checked}
          onPressCheckbox={() => {
            toggleTopicsList(index);
          }}
          key={topic.name}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    fontFamily: BOLD,
    fontSize: FS20,
    color: OFF_BLACK,
    marginTop: 20,
    marginBottom: 5,
    marginHorizontal: 15,
  },
});

export default AddToTopicScreen;
