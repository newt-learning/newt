import React, { useState, useEffect, useRef } from "react";
import { ScrollView, View, StyleSheet, Text, Image } from "react-native";
import _ from "lodash";
import { Feather } from "@expo/vector-icons";
// API
import { useFetchAllPlaylists } from "../../api/playlists";
// Components
import SubHeader from "../../components/Content/SubHeader";
import Description from "../../components/Content/Description";
import SelectShelfSection from "../ShelfSelectScreen/SelectShelfSection";
import SelectPlaylistsSection from "../ShelfSelectScreen/SelectPlaylistsSection";
import SelectStartFinishDatesSection from "../ShelfSelectScreen/SelectStartFinishDatesSection";
import ActionButton from "../../components/shared/ActionButton";
// Hooks
import useSingleCheckbox from "../../hooks/useSingleCheckbox";
import useMultiSelectCheckbox from "../../hooks/useMultiSelectCheckbox";
// Design
import { OFF_WHITE, GRAY_5, GRAY_3, GRAY_4 } from "../../design/colors";
import { REGULAR, FS14 } from "../../design/typography";
// Helpers
import { getBestThumbnail } from "./helpers";
import {
  initializeShelves,
  initializeMultiSelectCheckbox,
} from "../../helpers/screenHelpers";

const VideoConfirmation = ({ videoInfo, onGoBack, onSubmit }) => {
  // State for start and end dates for Finished videos
  const [startDate, setStartDate] = useState(new Date());
  const [finishDate, setFinishDate] = useState(new Date());
  // Used to expand or contract the description text and playlist options
  const [showMore, setShowMore] = useState(false);
  const [showMorePlaylists, setShowMorePlaylists] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    data: allPlaylistsData,
    status: allPlaylistsStatus,
  } = useFetchAllPlaylists();

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

  console.log(allPlaylistsData);
  console.log(playlistsRef);

  // This useEffect call will check if there's a change to playlist data, if there
  // is (i.e. if a user creates a playlist), it will add the new playlist to the
  // multi-checkbox and set it as already checked. Not a fan of this
  // implementation to deal with state updates and updates to hooks, but it works.
  useEffect(() => {
    // Get previous playlist state from ref
    const prevPlaylists = playlistsRef.current;

    console.log(prevPlaylists);

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
    } else {
      // Why does this work??? Updating ref and setting multi-checkboxes because
      // it doesn't update otherwise
      setCheckboxesFromOutside(
        initializeMultiSelectCheckbox(allPlaylistsData, [])
      );
      playlistsRef.current = allPlaylistsData;
    }
  }, [allPlaylistsData]);

  const {
    snippet: { title, description, thumbnails },
  } = videoInfo;

  const bestThumbnail = getBestThumbnail(thumbnails);

  // Placeholder image if there's no thumbnail provided
  const ThumbnailPlaceholder = () => (
    <View style={{ ...styles.thumbnail, ...styles.thumbnailPlaceholder }}>
      <Feather name="image" size={52} color={GRAY_3} />
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.confirmationContainer}>
      {bestThumbnail ? (
        <Image
          source={{ uri: bestThumbnail.url }}
          style={styles.thumbnail}
          resizeMode="contain"
        />
      ) : (
        <ThumbnailPlaceholder />
      )}
      <View style={styles.group}>
        <View style={{ padding: 5 }}>
          <SubHeader>Name</SubHeader>
          <Text style={styles.text}>{title}</Text>
        </View>
        <Description
          text={description}
          showMore={showMore}
          setShowMore={setShowMore}
          numCharacters={200}
          containerStyle={styles.description}
        />
      </View>
      <SelectShelfSection
        shelves={shelves}
        onSelectShelf={toggleShelves}
        rounded
      />
      {/* If the Finished Learning shelf is selected, show input selectors for
          start and finish dates */}
      {shelves[2].checked && (
        <SelectStartFinishDatesSection
          startDate={startDate}
          finishDate={finishDate}
          setStartDate={setStartDate}
          setFinishDate={setFinishDate}
          rounded
        />
      )}
      <SelectPlaylistsSection
        playlistsList={playlistsList}
        onSelectPlaylist={togglePlaylistsList}
        isLoading={allPlaylistsStatus === "loading"}
        isError={allPlaylistsStatus === "error"}
        showMore={showMorePlaylists}
        setShowMore={setShowMorePlaylists}
        playlistSelectContainer={{ marginHorizontal: 0 }}
      />
      <View style={styles.confirmBtnContainer}>
        <ActionButton
          title="Back"
          buttonStyle={styles.backBtn}
          onPress={onGoBack}
        />
        <ActionButton
          title="Confirm"
          buttonStyle={styles.confirmBtn}
          onPress={() => {
            setIsLoading(true);
            // Get chosen shelf
            const currentShelf = _.find(shelves, (shelf) => shelf.checked);
            // filter through the playlists list to get only the checked ones, then
            // from those objects only take out the ids
            const selectedPlaylistIds = _.chain(playlistsList)
              .filter({ checked: true })
              .map((item) => item._id);

            onSubmit(
              currentShelf.name,
              selectedPlaylistIds,
              startDate,
              finishDate
            );
          }}
          showLoading={isLoading}
        />
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
  thumbnailPlaceholder: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    backgroundColor: GRAY_4,
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
