import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, Text, FlatList } from "react-native";
import _ from "lodash";
// API
import {
  useFetchAllPlaylists,
  useAddContentToPlaylists,
  useRemoveContentFromPlaylists,
} from "../api/playlists";
// Context
import { Context as ContentContext } from "../context/ContentContext";
// Components
import Loader from "../components/shared/Loader";
import ListSelect from "../components/shared/ListSelect";
import ActionButton from "../components/shared/ActionButton";
import CreatePlaylistButton from "../components/MyLibrary/CreatePlaylistButton";
import ErrorMessage from "../components/shared/ErrorMessage";
// Hooks
import useMultiSelectCheckbox from "../hooks/useMultiSelectCheckbox";
// Helpers
import { initializeMultiSelectCheckbox } from "../helpers/screenHelpers";
// Design
import { SEMIBOLD, BOLD, FS16, FS20 } from "../design/typography";
import { OFF_BLACK, GRAY_2 } from "../design/colors";
import displayErrorAlert from "../components/shared/displayErrorAlert";

const AddToPlaylistScreen = ({ navigation, route }) => {
  const [shownUpdatingError, setShownUpdatingError] = useState(false);
  const { contentId, contentPlaylists } = route.params;

  const {
    state: { isFetching },
    fetchContent,
    updateContent,
  } = useContext(ContentContext);
  const {
    data: allPlaylistsData,
    status: allPlaylistsStatus,
    refetch: refetchAllPlaylists,
  } = useFetchAllPlaylists();
  const [
    addContentToPlaylists,
    { status: addingStatus },
  ] = useAddContentToPlaylists();
  const [
    removeContentFromPlaylists,
    { status: removingStatus },
  ] = useRemoveContentFromPlaylists();

  // Initialize empty multi-select list
  const [
    playlistsList,
    togglePlaylistsList,
    setCheckboxesFromOutside,
  ] = useMultiSelectCheckbox([]);

  // This is a little hacky? way (I think, can't find anything cases like this),
  // to fix the bug where the checkboxes were being initialized before the
  // playlists data loaded, thus showing an empty screen. Since hooks have to be
  // top level, they can't be set conditionally or in useEffect, and there can't
  // be the Loader return before as well (throws an error). This way, the
  // playlistsList is initialized again once the data has loaded (or if there's any
  // change).
  useEffect(() => {
    setCheckboxesFromOutside(
      initializeMultiSelectCheckbox(
        allPlaylistsData,
        contentPlaylists.map((playlist) => playlist._id)
      )
    );
  }, [allPlaylistsData, contentPlaylists]);

  // Loading UI
  if (
    allPlaylistsStatus === "loading" ||
    addingStatus === "loading" ||
    removingStatus === "loading" ||
    isFetching
  ) {
    return <Loader />;
  }

  // Error Message
  if (allPlaylistsStatus === "error") {
    return (
      <ErrorMessage
        message="Sorry, we're having some trouble fetching your playlists."
        onRetry={refetchAllPlaylists}
      />
    );
  }

  // Error alert if there's an error adding/removing playlist from book/video
  if (
    (addingStatus === "error" || removingStatus === "error") &&
    !shownUpdatingError
  ) {
    displayErrorAlert(
      "Sorry, an error occurred while trying to update your playlists."
    );
    setShownUpdatingError(true);
  }

  const updatePlaylistsAndContent = async (playlistsList) => {
    // First filter through the playlists list to get only the checked ones, then
    // from those objects only take out the ids
    const selectedPlaylistsIds = _.filter(playlistsList, { checked: true }).map(
      (item) => item._id
    );
    const contentPlaylistsIds = contentPlaylists.map(
      (playlist) => playlist._id
    );

    let playlistsToAdd = [];
    let playlistsToRemove = [];

    // For each of the playlists selected, if they're not in the existing playlists,
    // only then add it to the playlistsToAdd array. Only those playlists will then
    // have the content added to it to avoid duplication.
    selectedPlaylistsIds.forEach((playlistId) => {
      if (!_.includes(contentPlaylistsIds, playlistId)) {
        playlistsToAdd.push(playlistId);
      }
    });

    // For each of the existing playlists, if they're not in the selected playlists,
    // then add it to the playlistsToRemove array. It will be used to remove the
    // playlist <==> content associations.
    contentPlaylistsIds.forEach((playlistId) => {
      if (!_.includes(selectedPlaylistsIds, playlistId)) {
        playlistsToRemove.push(playlistId);
      }
    });

    // Send request to add the content to the newly selected playlists, remove
    // playlists that were unselected, and update the content by adding the playlists
    // to it
    updateContent(contentId, { playlists: selectedPlaylistsIds });
    await addContentToPlaylists({ playlistIds: playlistsToAdd, contentId });
    await removeContentFromPlaylists({
      playlistIds: playlistsToRemove,
      contentId,
    });
    // Temporarily fetch all content after updating until I move ContentContext to
    // react-query
    fetchContent();
  };

  // Display message and button to go to Create Playlist screen when there are no
  // playlists
  const NoPlaylists = () => {
    return (
      <View style={styles.noPlaylistsContainer}>
        <Text style={styles.noDataText}>
          Looks like you haven't created any playlists.
        </Text>
        <CreatePlaylistButton
          onPress={() => navigation.navigate("CreatePlaylist")}
        />
      </View>
    );
  };

  // Show "Select playlists" header only if there are playlists already created
  const AddToPlaylistHeader = () => {
    return (
      !_.isEmpty(playlistsList) && (
        <Text style={styles.header}>Select Playlist(s)</Text>
      )
    );
  };

  // Show Confirmation button at the end only if there are playlists already created
  const AddToPlaylistFooter = () => {
    return (
      !_.isEmpty(playlistsList) && (
        <ActionButton
          title="Confirm"
          onPress={async () => {
            await updatePlaylistsAndContent(playlistsList);
            navigation.goBack();
          }}
        />
      )
    );
  };

  return (
    <FlatList
      contentContainerStyle={styles.container}
      data={playlistsList}
      renderItem={({ item, index }) => (
        <ListSelect
          name={item.name}
          checked={item.checked}
          onPressCheckbox={() => {
            togglePlaylistsList(index);
          }}
        />
      )}
      keyExtractor={(item) => item.name}
      ListEmptyComponent={<NoPlaylists />}
      ListHeaderComponent={<AddToPlaylistHeader />}
      ListFooterComponent={<AddToPlaylistFooter />}
      ListFooterComponentStyle={styles.btnContainer}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  noPlaylistsContainer: {
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

export default AddToPlaylistScreen;
