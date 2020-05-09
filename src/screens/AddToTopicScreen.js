import React, { useContext, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import _ from "lodash";
// Context
import { Context as TopicsContext } from "../context/TopicsContext";
// Components
import Loader from "../components/shared/Loader";
import ListSelect from "../components/shared/ListSelect";
import ActionButton from "../components/shared/ActionButton";
// Hooks
import useMultiSelectCheckbox from "../hooks/useMultiSelectCheckbox";
// Helpers
import { initializeMultiSelectCheckbox } from "../helpers/screenHelpers";
// Design
import { BOLD, FS20 } from "../design/typography";
import { OFF_BLACK } from "../design/colors";

const AddToTopicScreen = ({ route }) => {
  const {
    state: { isFetching, items },
    fetchTopics,
    addContentToTopics,
  } = useContext(TopicsContext);

  // Initialize empty multi-select list
  const [
    topicsList,
    toggleTopicsList,
    setCheckboxesFromOutside,
  ] = useMultiSelectCheckbox([]);

  // Array of topic ids that the content (book, etc.) is already in
  const { contentId, contentTopics } = route.params;

  useEffect(() => {
    fetchTopics();
  }, []);

  // This is a little hacky? way (I think, can't find anything cases like this),
  // to fix the bug where the checkboxes were being initialized before the
  // topics data loaded, thus showing an empty screen. Since hooks have to be
  // top level, they can't be set conditionally or in useEffect, and there can't
  // be the Loader return before as well (throws an error). This way, the
  // topicsList is initialized again once the data has loaded (or if there's any
  // change).
  useEffect(() => {
    setCheckboxesFromOutside(
      initializeMultiSelectCheckbox(items, contentTopics)
    );
  }, [items, contentTopics]);

  if (isFetching) {
    return <Loader />;
  }

  const updateTopicsAndContent = (topicsList) => {
    // First filter through the topics list to get only the checked ones, then
    // from those objects only take out the ids
    const selectedTopicsIds = _.chain(topicsList)
      .filter({ checked: true })
      .map((item) => item._id);

    // Send request to add the content to the selected topics
    addContentToTopics({ topicIds: selectedTopicsIds, contentId });
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.header}>Select Topic(s)</Text>
        <View>
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
      </View>
      <View style={styles.btnContainer}>
        <ActionButton
          title="Confirm"
          onPress={() => {
            updateTopicsAndContent(topicsList);
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  header: {
    fontFamily: BOLD,
    fontSize: FS20,
    color: OFF_BLACK,
    marginTop: 20,
    marginBottom: 5,
    marginHorizontal: 15,
  },
  btnContainer: {
    marginBottom: 30,
    alignSelf: "center",
  },
});

export default AddToTopicScreen;
