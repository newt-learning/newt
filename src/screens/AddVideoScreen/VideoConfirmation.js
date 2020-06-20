import React, { useState, useContext, useEffect, useRef } from "react";
import { ScrollView, View, StyleSheet, Text, Image } from "react-native";
// Context
import { Context as TopicsContext } from "../../context/TopicsContext";
// Components
import SubHeader from "../../components/Content/SubHeader";
import Description from "../../components/Content/Description";
import SelectShelfSection from "../ShelfSelectScreen/SelectShelfSection";
import SelectTopicsSection from "../ShelfSelectScreen/SelectTopicsSection";
import ActionButton from "../../components/shared/ActionButton";
// Hooks
import useSingleCheckbox from "../../hooks/useSingleCheckbox";
import useMultiSelectCheckbox from "../../hooks/useMultiSelectCheckbox";
// Design
import { OFF_WHITE, GRAY_5, GRAY_3 } from "../../design/colors";
import { REGULAR, FS14 } from "../../design/typography";
// Helpers
import {
  initializeShelves,
  initializeMultiSelectCheckbox,
} from "../../helpers/screenHelpers";

const VideoConfirmation = ({ videoInfo, setOnConfirmationSection }) => {
  // Used to expand or contract the description text
  const [showMore, setShowMore] = useState(false);

  const { state: topicsState } = useContext(TopicsContext);

  // Initialize shelves and topics checkboxes/selectors
  const [shelves, toggleShelves] = useSingleCheckbox(
    initializeShelves("Want to Learn")
  );
  const [
    topicsList,
    toggleTopicsList,
    setCheckboxesFromOutside,
  ] = useMultiSelectCheckbox(
    initializeMultiSelectCheckbox(topicsState.items, [])
  );

  // Create a ref to be used as the previous topics state for comparison with a
  // new one should it be updated (so that the new topic can be added to the
  // topics multi-checkbox)
  const topicsRef = useRef(topicsState.items);

  // This useEffect call will check if there's a change to topicState, if there
  // is (i.e. if a user creates a topic), it will add the new topic to the
  // multi-checkbox and set it as already checked. Not a fan of this
  // implementation to deal with state updates and updates to hooks, but it works.
  useEffect(() => {
    // Get previous topic state from ref
    const prevTopics = topicsRef.current;

    // If the topics items state is not the same length (if they are then
    // no useful change, we only care about whether a topic was added or not),
    // then add the new topic to the mult-checkbox
    if (prevTopics.length !== topicsState.items.length) {
      // new topic is the last item in the array
      const newTopic = topicsState.items[topicsState.items.length - 1];

      setCheckboxesFromOutside([
        ...topicsList,
        { _id: newTopic._id, name: newTopic.name, checked: true },
      ]);
      // Update ref to new topic items state
      topicsRef.current = topicsState.items;
    }
  }, [topicsState.items]);

  const {
    snippet: { title, description },
  } = videoInfo;

  return (
    <ScrollView contentContainerStyle={styles.confirmationContainer}>
      <Image
        source={{ uri: videoInfo.snippet.thumbnails.maxres.url }}
        style={styles.thumbnail}
        resizeMode="contain"
      />
      <View style={styles.group}>
        <View style={{ padding: 5 }}>
          <SubHeader>Name</SubHeader>
          <Text style={styles.text}>{title}</Text>
        </View>
        <Description
          text={description}
          showMore={showMore}
          setShowMore={setShowMore}
          containerStyle={styles.description}
        />
      </View>
      <SelectShelfSection
        shelves={shelves}
        onSelectShelf={toggleShelves}
        rounded
      />
      <SelectTopicsSection
        topicsList={topicsList}
        onSelectTopic={toggleTopicsList}
        topicSelectContainer={{ marginHorizontal: 0 }}
      />
      <View style={styles.confirmBtnContainer}>
        <ActionButton
          title="Back"
          buttonStyle={styles.backBtn}
          onPress={() => setOnConfirmationSection(false)}
        />
        <ActionButton title="Confirm" buttonStyle={styles.confirmBtn} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  confirmationContainer: {
    padding: 15,
    backgroundColor: GRAY_5,
  },
  group: {
    marginTop: 10,
    backgroundColor: OFF_WHITE,
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderRadius: 12,
  },
  thumbnail: {
    borderRadius: 8,
    height: 195,
    marginBottom: 10,
  },
  description: {
    padding: 5,
    marginTop: 10,
    borderBottomWidth: 0,
  },
  confirmBtnContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 40,
    marginBottom: 20,
  },
  backBtn: {
    width: 125,
    backgroundColor: GRAY_3,
  },
  confirmBtn: {
    width: 125,
  },
  text: {
    fontFamily: REGULAR,
    fontSize: FS14,
  },
});

export default VideoConfirmation;
