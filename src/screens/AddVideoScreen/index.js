import React, { useState, useContext, useEffect, useRef } from "react";
import _ from "lodash";
// API
import { useCreateSeries } from "../../api/series";
import { useFetchAllPlaylists } from "../../api/playlists";
// Context
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

  const {
    data: allPlaylistsData,
    status: allPlaylistsStatus,
  } = useFetchAllPlaylists();

  const { addContent, fetchContent } = useContext(ContentContext);
  // API request func. to DB to create a series
  const [createSeries, { status }] = useCreateSeries();

  // Initialize shelves and playlists checkboxes/selectors
  const [shelves, toggleShelves] = useSingleCheckbox(
    initializeShelves("Want to Learn")
  );
  const [
    playlistsList,
    togglePlaylistsList,
    setCheckboxesFromOutside,
  ] = useMultiSelectCheckbox(
    initializeMultiSelectCheckbox(allPlaylistsData, [])
  );

  // Create a ref to be used as the previous playlist state for comparison with a
  // new one should it be updated (so that the new playlist can be added to the
  // playlist multi-checkbox)
  const playlistsRef = useRef(allPlaylistsData);

  // This useEffect call will check if there's a change to playlist data, if there
  // is (i.e. if a user creates a playlist), it will add the new playlist to the
  // multi-checkbox and set it as already checked. Not a fan of this
  // implementation to deal with state updates and updates to hooks, but it works.
  useEffect(() => {
    // Get previous playlist state from ref
    const prevPlaylists = playlistsRef.current;

    // If the playlist data is not the same length (if they are then
    // no useful change, we only care about whether a playlist was added or not),
    // then add the new playlist to the mult-checkbox
    if (prevPlaylists && prevPlaylists?.length !== allPlaylistsData?.length) {
      // new playlist is the last item in the array
      const newPlaylist = allPlaylistsData[allPlaylistsData.length - 1];

      setCheckboxesFromOutside([
        ...playlistsList,
        { _id: newPlaylist._id, name: newPlaylist.name, checked: true },
      ]);
      // Update ref to new playlist items state
      playlistsRef.current = allPlaylistsData;
    }
  }, [allPlaylistsData]);

  const addVideo = async (selectedShelf, selectedPlaylists) => {
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
          shelves={shelves}
          onSelectShelf={toggleShelves}
          playlists={playlistsList}
          onSelectPlaylist={togglePlaylistsList}
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
