import React, { useState, useContext, useEffect, useRef } from "react";
import _ from "lodash";
// API
import { useCreateSeries } from "../../api/series";
// Context
import { Context as TopicsContext } from "../../context/TopicsContext";
import { Context as ContentContext } from "../../context/ContentContext";
// Components
import VideoUrlForm from "./VideoUrlForm";
import VideoConfirmation from "./VideoConfirmation";
import SeriesConfirmation from "./SeriesConfirmation";
// Hooks
import useSingleCheckbox from "../../hooks/useSingleCheckbox";
import useMultiSelectCheckbox from "../../hooks/useMultiSelectCheckbox";
// Helpers
import {
  initializeShelves,
  initializeMultiSelectCheckbox,
} from "../../helpers/screenHelpers";
import {
  extractAndAssembleVideoInfo,
  extractAndAssemblePlaylistInfo,
} from "./helpers";

const AddVideoScreen = ({ navigation }) => {
  const [videoLink, setVideoLink] = useState("");
  const [seriesLink, setSeriesLink] = useState("");
  const [videoInfo, setVideoInfo] = useState(null);
  const [seriesInfo, setSeriesInfo] = useState(null);
  // State for start and end dates for Finished books
  const [startDate, setStartDate] = useState(new Date());
  const [finishDate, setFinishDate] = useState(new Date());
  // Used to move between the form and confirmation sections
  const [onConfirmationSection, setOnConfirmationSection] = useState(false);

  const { state: topicsState, fetchTopics } = useContext(TopicsContext);
  const { addContent } = useContext(ContentContext);
  // API request func. to DB to create a series
  const [createSeries] = useCreateSeries();

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
    const contentInfo = extractAndAssembleVideoInfo(
      videoInfo,
      selectedShelf,
      selectedTopics,
      startDate,
      finishDate
    );

    await addContent(contentInfo);
    // If the topics list is not empty, fetch topics because the video will be
    // added to whatever topics that were selected, and this way it'll fetch the
    // new data (not an ideal way of doing this).
    if (!_.isEmpty(selectedTopics)) {
      fetchTopics();
    }
    navigation.goBack();
  };

  const addSeries = () => {
    const formattedSeriesInfo = extractAndAssemblePlaylistInfo(seriesInfo);

    createSeries(formattedSeriesInfo);
  };

  // If on the confirmation section, show either the video confirmation or series
  // confirmation depending on the request that was made. Otherwise show the
  // input fields to enter the links
  if (onConfirmationSection) {
    if (!_.isEmpty(videoInfo)) {
      return (
        <VideoConfirmation
          videoInfo={videoInfo}
          shelves={shelves}
          onSelectShelf={toggleShelves}
          topics={topicsList}
          onSelectTopic={toggleTopicsList}
          startDate={startDate}
          finishDate={finishDate}
          setStartDate={setStartDate}
          setFinishDate={setFinishDate}
          onGoBack={() => setOnConfirmationSection(false)}
          onSubmit={addVideo}
        />
      );
    } else {
      return (
        <SeriesConfirmation
          seriesInfo={seriesInfo}
          onGoBack={() => setOnConfirmationSection(false)}
          onSubmit={addSeries}
        />
      );
    }
  } else {
    return (
      <VideoUrlForm
        videoLink={videoLink}
        seriesLink={seriesLink}
        setVideoLink={setVideoLink}
        setSeriesLink={setSeriesLink}
        setVideoInfo={setVideoInfo}
        setSeriesInfo={setSeriesInfo}
        setOnConfirmationSection={setOnConfirmationSection}
      />
    );
  }
};

export default AddVideoScreen;
