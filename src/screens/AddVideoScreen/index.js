import React, { useState, useContext, useEffect, useRef } from "react";
import _ from "lodash";
// Context
import { Context as TopicsContext } from "../../context/TopicsContext";
import { Context as ContentContext } from "../../context/ContentContext";
// Components
import VideoUrlForm from "./VideoUrlForm";
import VideoConfirmation from "./VideoConfirmation";
// Hooks
import useSingleCheckbox from "../../hooks/useSingleCheckbox";
import useMultiSelectCheckbox from "../../hooks/useMultiSelectCheckbox";
// Helpers
import {
  initializeShelves,
  initializeMultiSelectCheckbox,
} from "../../helpers/screenHelpers";
import { getBestThumbnail, extractAndAssembleVideoInfo } from "./helpers";

const AddVideoScreen = ({ navigation }) => {
  const [videoLink, setVideoLink] = useState("");
  const [videoInfo, setVideoInfo] = useState(null);
  const [onConfirmationSection, setOnConfirmationSection] = useState(false);

  const { state: topicsState } = useContext(TopicsContext);
  const { addContent } = useContext(ContentContext);

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

  const addVideo = async (selectedShelf, selectedTopics) => {
    const bestThumbnail = getBestThumbnail(videoInfo.snippet.thumbnails);

    const contentInfo = extractAndAssembleVideoInfo(
      videoInfo,
      selectedShelf,
      selectedTopics
    );

    await addContent(contentInfo);
    navigation.goBack();
  };

  return onConfirmationSection ? (
    <VideoConfirmation
      videoInfo={videoInfo}
      setOnConfirmationSection={setOnConfirmationSection}
      shelves={shelves}
      onSelectShelf={toggleShelves}
      topics={topicsList}
      onSelectTopic={toggleTopicsList}
      onSubmit={addVideo}
    />
  ) : (
    <VideoUrlForm
      videoLink={videoLink}
      setVideoLink={setVideoLink}
      setVideoInfo={setVideoInfo}
      setOnConfirmationSection={setOnConfirmationSection}
    />
  );
};

export default AddVideoScreen;
