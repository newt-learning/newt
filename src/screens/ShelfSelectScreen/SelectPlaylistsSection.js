import React from "react";
import { View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
// Components
import { H3 } from "../../components/shared/Headers";
import MultiItemSelect from "../../components/shared/MultiItemSelect";
import ShowMoreShowLess from "../../components/Content/ShowMoreShowLess";
import Loader from "../../components/shared/Loader";
import ErrorMessage from "../../components/shared/ErrorMessage";

const INITIAL_NUM_PLAYLISTS_TO_SHOW = 8;

const SelectPlaylistsSection = ({
  playlistsList,
  onSelectPlaylist,
  isLoading,
  isError,
  showMore,
  setShowMore,
  showCreateItem = true,
  playlistSelectContainer: passedPlaylistSelectContainer,
}) => {
  const navigation = useNavigation();

  const playlistSelectContainer = StyleSheet.compose([
    styles.playlistSelectContainer,
    passedPlaylistSelectContainer,
  ]);

  return (
    <>
      <H3 style={styles.header}>Select Playlist(s)</H3>
      <View style={playlistSelectContainer}>
        {isLoading ? (
          <Loader />
        ) : isError ? (
          <ErrorMessage message="Error fetching playlists." />
        ) : (
          <MultiItemSelect
            itemsList={
              showMore
                ? playlistsList
                : playlistsList.slice(0, INITIAL_NUM_PLAYLISTS_TO_SHOW)
            }
            onSelect={onSelectPlaylist}
            showCreateItem={showCreateItem}
            onSelectCreateItem={() => navigation.navigate("CreatePlaylist")}
          />
        )}
      </View>
      {/* Only show the Show More button if there are more playlists to show (in
          this case, more than initial num defined above) */}
      {playlistsList.length > INITIAL_NUM_PLAYLISTS_TO_SHOW ? (
        <ShowMoreShowLess showMore={showMore} setShowMore={setShowMore} />
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    marginTop: 20,
    marginHorizontal: 15,
    marginBottom: 5,
  },
  playlistSelectContainer: {
    marginHorizontal: 8,
    flexDirection: "row",
    justifyContent: "flex-start",
    flexWrap: "wrap",
  },
});

export default SelectPlaylistsSection;
