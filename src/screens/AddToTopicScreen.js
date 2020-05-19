import React, { useContext, useEffect } from "react";
import { View, StyleSheet, Text, FlatList } from "react-native";
import _ from "lodash";
// Context
import { Context as TopicsContext } from "../context/TopicsContext";
import { Context as ContentContext } from "../context/ContentContext";
// Components
import Loader from "../components/shared/Loader";
import ListSelect from "../components/shared/ListSelect";
import ActionButton from "../components/shared/ActionButton";
import CreateTopicButton from "../components/MyLibrary/CreateTopicButton";
// Hooks
import useMultiSelectCheckbox from "../hooks/useMultiSelectCheckbox";
// Helpers
import { initializeMultiSelectCheckbox } from "../helpers/screenHelpers";
// Design
import { SEMIBOLD, BOLD, FS16, FS20 } from "../design/typography";
import { OFF_BLACK, GRAY_2 } from "../design/colors";

const AddToTopicScreen = ({ navigation, route }) => {
  const {
    state: { isFetching, items },
    fetchTopics,
    addContentToTopics,
    removeContentTopics,
  } = useContext(TopicsContext);
  const { updateContent } = useContext(ContentContext);

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

  const updateTopicsAndContent = async (topicsList) => {
    // First filter through the topics list to get only the checked ones, then
    // from those objects only take out the ids
    const selectedTopicsIds = _.filter(topicsList, { checked: true }).map(
      (item) => item._id
    );

    let topicsToAdd = [];
    let topicsToRemove = [];

    // For each of the topics selected, if they're not in the existing topics,
    // only then add it to the topicsToAdd array. Only those topics will then
    // have the content added to it to avoid duplication.
    selectedTopicsIds.forEach((topicId) => {
      if (!_.includes(contentTopics, topicId)) {
        topicsToAdd.push(topicId);
      }
    });

    // For each of the existing topics, if they're not in the selected topics,
    // then add it to the topicsToRemove array. It will be used to remove the
    // topic <==> content associations.
    contentTopics.forEach((topicId) => {
      if (!_.includes(selectedTopicsIds, topicId)) {
        topicsToRemove.push(topicId);
      }
    });

    // Send request to add the content to the newly selected topics, remove
    // topics that were unselected, and update the content by adding the topics
    // to it
    updateContent(contentId, { topics: selectedTopicsIds });
    await addContentToTopics({ topicIds: topicsToAdd, contentId });
    await removeContentTopics({ topicIds: topicsToRemove, contentId });
    // Temporarily fetch all topics after updating until I rethink db requests/
    // db joins and/or complex state management.
    await fetchTopics();
  };

  // Display message and button to go to Create Topic screen when there are no
  // topics
  const NoTopics = () => {
    return (
      <View style={styles.noTopicsContainer}>
        <Text style={styles.noDataText}>
          Looks like you haven't created any topics.
        </Text>
        <CreateTopicButton onPress={() => navigation.navigate("CreateTopic")} />
      </View>
    );
  };

  // Show "Select topics" header only if there are topics already created
  const AddToTopicHeader = () => {
    return (
      !_.isEmpty(topicsList) && (
        <Text style={styles.header}>Select Topic(s)</Text>
      )
    );
  };

  // Show Confirmation button at the end only if there are topics already created
  const AddToTopicFooter = () => {
    return (
      !_.isEmpty(topicsList) && (
        <ActionButton
          title="Confirm"
          onPress={() => {
            updateTopicsAndContent(topicsList);
            navigation.goBack();
          }}
        />
      )
    );
  };

  return (
    <FlatList
      contentContainerStyle={styles.container}
      data={topicsList}
      renderItem={({ item, index }) => (
        <ListSelect
          name={item.name}
          checked={item.checked}
          onPressCheckbox={() => {
            toggleTopicsList(index);
          }}
        />
      )}
      keyExtractor={(item) => item.name}
      ListEmptyComponent={<NoTopics />}
      ListHeaderComponent={<AddToTopicHeader />}
      ListFooterComponent={<AddToTopicFooter />}
      ListFooterComponentStyle={styles.btnContainer}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  noTopicsContainer: {
    marginHorizontal: 15,
    marginVertical: 20,
    flex: 1,
    justifyContent: "space-between",
  },
  noDataText: {
    fontFamily: SEMIBOLD,
    fontSize: FS16,
    color: GRAY_2,
    textAlign: "center",
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
    flex: 1,
    justifyContent: "flex-end",
    marginTop: 20,
    marginBottom: 30,
    alignSelf: "center",
  },
});

export default AddToTopicScreen;
