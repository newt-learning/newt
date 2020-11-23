import React from "react";
import { View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import _ from "lodash";
// Components
import Pill from "../shared/Pill";
// Design
import { FS12 } from "../../design/typography";

const AddToPlaylistPill = ({ contentId, contentPlaylists }) => {
  const navigation = useNavigation();

  return (
    <Pill
      title="Add playlist"
      addPill={true}
      onPress={() =>
        navigation.navigate("AddToPlaylist", {
          contentId,
          contentPlaylists,
        })
      }
    />
  );
};

const ContentPlaylistSection = ({ contentId, playlists }) => {
  const navigation = useNavigation();

  if (_.isEmpty(playlists)) {
    return (
      <View style={styles.playlistsContainer}>
        <AddToPlaylistPill contentId={contentId} contentPlaylists={playlists} />
      </View>
    );
  }

  return (
    <View style={styles.playlistsContainer}>
      {playlists.map((playlist) => {
        return (
          <Pill
            title={playlist?.name}
            key={playlist?._id}
            onPress={() =>
              navigation.navigate("Playlist", {
                playlistInfo: playlist,
              })
            }
          />
        );
      })}
      <AddToPlaylistPill contentId={contentId} contentPlaylists={playlists} />
    </View>
  );
};

const styles = StyleSheet.create({
  playlistsContainer: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  addToPlaylistBtn: {
    borderRadius: 30,
    paddingVertical: 3,
    paddingHorizontal: 15,
    alignSelf: "center",
  },
  addToPlaylistBtnTitle: {
    fontSize: FS12,
    marginLeft: 8,
  },
});

export default ContentPlaylistSection;
