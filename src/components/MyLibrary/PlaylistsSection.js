import React, { Fragment } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import _ from "lodash";
// Components
import CreatePlaylistButton from "./CreatePlaylistButton";
import PlaylistCard from "./PlaylistCard";
// Design
import { GRAY_2 } from "../../design/colors";
import { SEMIBOLD, FS14 } from "../../design/typography";

const PlaylistsSection = ({ items, ButtonGroupHeader }) => {
  const navigation = useNavigation();

  if (_.isEmpty(items)) {
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
        data={items}
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
