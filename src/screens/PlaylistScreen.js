import React, { useLayoutEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import _ from "lodash";
// API
import { useFetchPlaylist, useDeletePlaylist } from "../api/playlists";
// Components
import OptionsModal from "../components/shared/OptionsModal";
import ContentList from "../components/ContentList";
import Loader from "../components/shared/Loader";
import { NavHeaderTitle } from "../components/shared/Headers";
import MoreOptionsButton from "../components/shared/MoreOptionsButton";
import initiateDeleteConfirmation from "../components/shared/initiateDeleteConfirmation";
// Design
import { SEMIBOLD, FS16 } from "../design/typography";
import { GRAY_2 } from "../design/colors";

const PlaylistScreen = ({ route, navigation }) => {
  const playlist = route.params.playlistInfo;
  const [playlistInfo, setPlaylistInfo] = useState(playlist);

  // Fetch playlist by id
  const { data: playlistData, status } = useFetchPlaylist(playlistInfo?._id);
  const [
    deletePlaylist,
    { status: deletePlaylistStatus },
  ] = useDeletePlaylist();

  // Initialize modal visibility
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Add the 3-dot options icon which opens the modal on the right side of the header.
  // Also added title and headerTitle options here so that they update once the
  // topic has been updated (see useEffect below)
  useLayoutEffect(() => {
    navigation.setOptions({
      title: playlistData?.name,
      headerTitle: () => <NavHeaderTitle title={playlistData?.name} />,
      headerRight: () => (
        <MoreOptionsButton onPress={() => setIsModalVisible(true)} />
      ),
      // Work around to title truncation not working as expected in react-navigation
      // https://github.com/react-navigation/react-navigation/issues/7057#issuecomment-593086348
      headerTitleContainerStyle: {
        width: Platform.OS === "ios" ? "60%" : "70%",
        alignItems: Platform.OS === "ios" ? "center" : "flex-start",
      },
      headerBackTitle: "Back",
    });
  }, [playlistData]);

  // List of buttons in the options modal
  const modalOptions = [
    {
      title: "Edit",
      onPress: () => {
        navigation.navigate("EditPlaylist", { playlistInfo: playlistData });
        setIsModalVisible(false);
      },
    },
    {
      title: "Delete",
      onPress: () => {
        // Hide the options modal
        setIsModalVisible(false);
        // Put the delete ActionSheet/Alert in a timer so that the modal
        // animation finishes first, otherwise the ActionSheet/Alert appears
        // then immediately disappears. This is def not the proper way of
        // handling this, but can't find good info on how to handle this
        // particular case
        setTimeout(function () {
          const deleteMessage =
            "Are you sure you want to delete this playlist?";
          const onDelete = async () => {
            await deletePlaylist(playlistInfo._id);
            // Fetch all content (for now, should really be only changed ones),
            // because they'll be updated after deleting the topic
            // fetchContent();
            navigation.goBack();
          };

          initiateDeleteConfirmation(deleteMessage, onDelete);
        }, 400);
      },
      isDelete: true,
    },
  ];

  // Show Loader if either playlist is fetching
  if (status === "loading") {
    return <Loader />;
  }

  // If the playlist has no content saved, show no content message
  if (_.isEmpty(playlistData?.content)) {
    return (
      <View style={styles.container}>
        <Text style={styles.noDataText}>
          There is no content saved under this playlist.
        </Text>
        <OptionsModal
          isVisible={isModalVisible}
          onBackdropPress={() => setIsModalVisible(false)}
          options={modalOptions}
        />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <ContentList data={playlistData?.content} />
      <OptionsModal
        isVisible={isModalVisible}
        onBackdropPress={() => setIsModalVisible(false)}
        options={modalOptions}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  noDataText: {
    marginHorizontal: 15,
    marginTop: 20,
    fontFamily: SEMIBOLD,
    fontSize: FS16,
    color: GRAY_2,
    textAlign: "center",
  },
});

export default PlaylistScreen;
