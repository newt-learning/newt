import React, { useState, Fragment } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import _ from "lodash";
// API
import { useFetchAllPlaylists } from "../../api/playlists";
// Components
import CreatePlaylistButton from "./CreatePlaylistButton";
import PlaylistCard from "./PlaylistCard";
import Loader from "../shared/Loader";
import displayErrorAlert from "../shared/displayErrorAlert";
import ErrorMessage from "../shared/ErrorMessage";
// Design
import { GRAY_2 } from "../../design/colors";
import { SEMIBOLD, FS14 } from "../../design/typography";

const PlaylistsSection = ({ ButtonGroupHeader }) => {
  // Whether the loading error has previously been shown, so it doesn't keep
  // rerendering
  const [playlistErrorShown, setPlaylistErrorShown] = useState(false);

  const {
    data: playlistData,
    status: playlistDataStatus,
    refetch,
  } = useFetchAllPlaylists();

  const navigation = useNavigation();

  // Loading UI
  if (playlistDataStatus === "loading") {
    return (
      <>
        <ButtonGroupHeader />
        <Loader />
      </>
    );
  }

  // Error handling
  if (playlistDataStatus === "error") {
    return (
      <>
        <ButtonGroupHeader />
        <ErrorMessage
          message="Sorry, we're having some trouble fetching your playlists."
          onRetry={refetch}
        />
      </>
    );
  }

  // No data UI
  if (_.isEmpty(playlistData)) {
    return (
      <View style={styles.container}>
        <ButtonGroupHeader />
        <Text style={styles.noDataText}>
          Looks like you haven't created any playlists. You can use playlists to
          organize your content.
        </Text>
        <View style={styles.btnContainer}>
          <CreatePlaylistButton
            onPress={() => navigation.navigate("CreatePlaylist")}
          />
        </View>
      </View>
    );
  }

  return (
    <Fragment>
      <FlatList
        ListHeaderComponent={<ButtonGroupHeader />}
        ListHeaderComponentStyle={{ marginBottom: 15 }}
        ListFooterComponent={
          <CreatePlaylistButton
            onPress={() => navigation.navigate("CreatePlaylist")}
          />
        }
        ListFooterComponentStyle={{ ...styles.btnContainer, marginTop: 20 }}
        data={playlistData}
        numColumns={2}
        renderItem={({ item }) => <PlaylistCard playlistInfo={item} />}
        keyExtractor={(playlist) => playlist._id}
        columnWrapperStyle={styles.columnContainer}
      />
    </Fragment>
  );
};

const styles = StyleSheet.create({
  columnContainer: {
    marginHorizontal: 10,
  },
  noDataText: {
    textAlign: "center",
    fontFamily: SEMIBOLD,
    fontSize: FS14,
    color: GRAY_2,
    marginTop: 10,
  },
  btnContainer: {
    marginHorizontal: 15,
  },
});

export default PlaylistsSection;
