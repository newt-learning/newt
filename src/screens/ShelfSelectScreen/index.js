import React, { useState, useContext, useEffect, useRef } from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import _ from "lodash";
// API
import { useAddContentToChallenge } from "../../api/challenges";
import { useFetchAllPlaylists } from "../../api/playlists";
// Context
import { Context as ContentContext } from "../../context/ContentContext";
// Components
import SelectShelfSection from "./SelectShelfSection";
import SelectPlaylistsSection from "./SelectPlaylistsSection";
import ActionButton from "../../components/shared/ActionButton";
import ClearButton from "../../components/shared/ClearButton";
import Loader from "../../components/shared/Loader";
import initiateDeleteConfirmation from "../../components/shared/initiateDeleteConfirmation";
// Hooks
import useSingleCheckbox from "../../hooks/useSingleCheckbox";
import useMultiSelectCheckbox from "../../hooks/useMultiSelectCheckbox";
// Styling
import { RED, GRAY_5 } from "../../design/colors";
// Helpers
import {
  initializeShelves,
  initializeMultiSelectCheckbox,
  handleContentNavigation,
} from "../../helpers/screenHelpers";
import { figureOutShelfMovingDataChanges } from "./helpers";
import SelectStartFinishDatesSection from "./SelectStartFinishDatesSection";

const ShelfSelectScreen = ({ navigation, route }) => {
  const [isLoading, setIsLoading] = useState(false);
  // State for start and end dates for Finished books
  const [startDate, setStartDate] = useState(new Date());
  const [finishDate, setFinishDate] = useState(new Date());
  // Show more/less playlists
  const [showMorePlaylists, setShowMorePlaylists] = useState(false);

  const {
    data: allPlaylistsData,
    status: allPlaylistsStatus,
  } = useFetchAllPlaylists();

  const {
    state: contentState,
    fetchContent,
    addContent,
    deleteContent,
    updateContent,
  } = useContext(ContentContext);

  // Get params passed from route
  const { contentInfo, buttonText, addToLibrary, contentType } = route.params;

  // Initialize shelves and playlists checkboxes/selectors
  const [shelves, toggleShelves] = useSingleCheckbox(
    initializeShelves(contentInfo.shelf)
  );
  const [
    playlistsList,
    togglePlaylistsList,
    setCheckboxesFromOutside,
  ] = useMultiSelectCheckbox(
    initializeMultiSelectCheckbox(allPlaylistsData, [])
  );

  // Get function to add content to an existing challenge (used when shelf is
  // changed to "Finished Learning")
  const [addContentToChallenge] = useAddContentToChallenge();

  // Create a ref to be used as the previous playlists state for comparison with a
  // new one should it be updated (so that the new playlist can be added to the
  // playlists multi-checkbox)
  const playlistsRef = useRef(allPlaylistsData);

  // This useEffect call will check if there's a change to playlist data, if there
  // is (i.e. if a user creates a playlist), it will add the new playlist to the
  // multi-checkbox and set it as already checked. Not a fan of this
  // implementation to deal with state updates and updates to hooks, but it works.
  useEffect(() => {
    // Get previous playlist state from ref
    const prevPlaylists = playlistsRef.current;

    // If the playlists data is not the same length (if they are then
    // no useful change, we only care about whether a playlist was added or not),
    // then add the new playlist to the multi-checkbox
    if (prevPlaylists && prevPlaylists?.length !== allPlaylistsData?.length) {
      // new playlist is the last item in the array
      const newPlaylist = allPlaylistsData[allPlaylistsData.length - 1];

      setCheckboxesFromOutside([
        ...playlistsList,
        { _id: newPlaylist._id, name: newPlaylist.name, checked: true },
      ]);
      // Update ref to new playlist state
      playlistsRef.current = playlistsState.items;
    }
  }, [allPlaylistsData]);

  const addContentToLibrary = async (selectedShelf, selectedPlaylists) => {
    const data = {
      ...contentInfo,
      shelf: selectedShelf,
      playlists: selectedPlaylists,
      type: contentType,
    };

    // If the selected shelf is Currently Learning, set first date started as now
    if (selectedShelf === "Currently Learning") {
      data.startFinishDates = [{ dateStarted: Date.now() }];
    }

    // If the selected shelf is Finished, add the dateCompleted field
    if (selectedShelf === "Finished Learning") {
      data.startFinishDates = [
        { dateStarted: startDate, dateCompleted: finishDate },
      ];
    }

    // Send request to add book and then send bookInfo as param in navigation
    // route to 'BookScreen'. This will allow the Shelf button to change from
    // 'Add to Library' to whatever shelf was chosen (ex: 'Want to Learn').
    const newContent = await addContent(data, true);

    // Update the reading challenge by adding this book to the finished list
    // if a challenge exists (if selected shelf is Finished).
    if (selectedShelf === "Finished Learning" && contentType === "book") {
      addContentToChallenge(newContent._id);
    }

    // Temporarily fetch everything so playlists for each content are updated
    fetchContent();

    // If the result is null, meaning there was an error in adding the book,
    // go back to previous screen.
    if (newContent === null) {
      navigation.goBack();
    } else {
      handleContentNavigation(newContent, navigation);
    }
  };
  const updateShelf = (selectedShelf) => {
    // Get the right data to change depending on which shelves the book is moving from/to.
    const updateData = figureOutShelfMovingDataChanges(
      contentInfo.shelf,
      selectedShelf,
      contentInfo
    );

    // Update data with the data gotten above
    updateContent(contentInfo._id, updateData);

    // If it's a book and the selected shelf is "Finished Learning", do
    // additional stuff like updating the reading challenge
    if (contentInfo.type === "book" && selectedShelf === "Finished Learning") {
      // Update the reading challenge by adding this book to the finished list
      // if a challenge exists.
      addContentToChallenge(contentInfo._id);
    }
    navigation.goBack();
  };
  const deleteItem = async () => {
    const deleteMessage = `Are you sure you want to delete this ${contentInfo.type}?`;
    const deleteFlow = async () => {
      navigation.popToTop();
      await deleteContent(contentInfo._id);
    };

    // Show delete ActionSheet/Alert
    initiateDeleteConfirmation(deleteMessage, deleteFlow);
  };

  // Function that decided what to do when the Confirm/Add To Library button is
  // pressed. If coming from the 'Add Content' screen, then add to Library.
  // Otherwise update the shelf of already existing content.
  const onConfirmShelf = (selectedShelf, selectedPlaylists) => {
    if (addToLibrary) {
      addContentToLibrary(selectedShelf, selectedPlaylists);
    } else {
      updateShelf(selectedShelf);
    }
  };

  if (contentState.isFetching || allPlaylistsStatus === "loading") {
    return <Loader />;
  }

  return (
    <ScrollView
      // The space-between makes the button stay at the bottom of the screen,
      // but for some reason scroll no longer works (when flex is 1, the
      // container doesn't exceed height of View). So if show more playlists is
      // pressed, change flex to 0 so scroll works.
      // TODO: Unfortunately it introduces another bug where the button no
      // longer stays at the bottom, and shoots up right below Select Playlists
      contentContainerStyle={{
        justifyContent: "space-between",
        flex: showMorePlaylists ? 0 : 1,
      }}
      style={styles.container}
    >
      <View style={styles.option}>
        {/* Section where you select the shelf */}
        <SelectShelfSection shelves={shelves} onSelectShelf={toggleShelves} />
        {/* If not in the Add to Library flow (so we're in My Library), show 
          button to delete content */}
        {!addToLibrary ? (
          <ClearButton
            title={`Delete ${contentInfo.type} from Library`}
            onPress={deleteItem}
            containerStyle={styles.deleteButton}
            titleStyle={styles.delete}
          />
        ) : null}
        {/* If the Finished Learning shelf is selected, show input selectors for
          start and finish dates */}
        {shelves[2].checked && addToLibrary ? (
          <SelectStartFinishDatesSection
            startDate={startDate}
            finishDate={finishDate}
            setStartDate={setStartDate}
            setFinishDate={setFinishDate}
          />
        ) : null}
        {/* If on Add to Library screen, show Playlist Selector */}
        {addToLibrary ? (
          <SelectPlaylistsSection
            playlistsList={playlistsList}
            onSelectPlaylist={togglePlaylistsList}
            showMore={showMorePlaylists}
            setShowMore={setShowMorePlaylists}
          />
        ) : null}
      </View>
      <View style={styles.buttonContainer}>
        <ActionButton
          title={buttonText}
          onPress={() => {
            setIsLoading(true);
            // Get chosen shelf
            const currentShelf = _.find(shelves, (shelf) => shelf.checked);
            // filter through the playlists list to get only the checked ones, then
            // from those objects only take out the ids
            const selectedPlaylistIds = _.chain(playlistsList)
              .filter({ checked: true })
              .map((item) => item._id);
            onConfirmShelf(currentShelf.name, selectedPlaylistIds);
          }}
          showLoading={isLoading}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: GRAY_5,
    flex: 1,
  },
  option: {
    justifyContent: "flex-start",
  },
  buttonContainer: {
    alignItems: "center",
    marginHorizontal: 15,
    marginVertical: 30,
  },
  deleteButton: {
    marginTop: 30,
  },
  delete: {
    color: RED,
  },
});

export default ShelfSelectScreen;
