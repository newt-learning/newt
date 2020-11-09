import React, { useState, useContext } from "react";
import _ from "lodash";
// API
import { useCreateSeries } from "../../api/series";
// Context
import { Context as ContentContext } from "../../context/ContentContext";
// Components
import VideoUrlForm from "./VideoUrlForm";
import VideoConfirmation from "./VideoConfirmation";
import SeriesConfirmation from "./SeriesConfirmation";
// Helpers
import {} from "../../helpers/screenHelpers";
import {
  extractAndAssembleVideoInfo,
  extractAndAssemblePlaylistInfo,
} from "./helpers";

const AddVideoScreen = ({ navigation }) => {
  const [videoLink, setVideoLink] = useState("");
  const [seriesLink, setSeriesLink] = useState("");
  const [videoInfo, setVideoInfo] = useState(null);
  const [seriesInfo, setSeriesInfo] = useState(null);
  // Used to move between the form and confirmation sections
  const [onConfirmationSection, setOnConfirmationSection] = useState(false);

  const { addContent, fetchContent } = useContext(ContentContext);
  // API request func. to DB to create a series
  const [createSeries, { status }] = useCreateSeries();

  const addVideo = async (
    selectedShelf,
    selectedPlaylists,
    startDate,
    finishDate
  ) => {
    const contentInfo = extractAndAssembleVideoInfo(
      videoInfo,
      selectedShelf,
      selectedPlaylists,
      startDate,
      finishDate
    );

    await addContent(contentInfo);
    // Temporary so that playlists are fetched for added content -- should be
    // fixed when moving over from Content Context to react-query
    fetchContent();

    navigation.goBack();
  };

  const addSeries = async () => {
    const formattedSeriesInfo = extractAndAssemblePlaylistInfo(seriesInfo);

    // Create series and fetch content so it's updated
    await createSeries(formattedSeriesInfo);
    fetchContent();
    navigation.goBack();
  };

  // If on the confirmation section, show either the video confirmation or series
  // confirmation depending on the request that was made. Otherwise show the
  // input fields to enter the links
  if (onConfirmationSection) {
    if (!_.isEmpty(videoInfo)) {
      return (
        <VideoConfirmation
          videoInfo={videoInfo}
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
          isSubmitting={status === "loading"}
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
