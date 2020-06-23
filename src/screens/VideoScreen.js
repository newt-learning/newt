import React, { useState, useContext, useLayoutEffect } from "react";
import { ScrollView, View, StyleSheet, Image } from "react-native";
import * as Linking from "expo-linking";
// Context
import { Context as ContentContext } from "../context/ContentContext";
// Components
import Loader from "../components/shared/Loader";
import TitleSection from "../components/Content/TitleSection";
import ActionSection from "../components/Content/ActionSection";
import Description from "../components/Content/Description";
import MoreOptionsButton from "../components/shared/MoreOptionsButton";
import OptionsModal from "../components/shared/OptionsModal";
// Design
import { OFF_WHITE } from "../design/colors";

const VideoScreen = ({ route, navigation }) => {
  // Toggle show more/less description text
  const [showMore, setShowMore] = useState(false);
  // Initialize modal visibility
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Add the 3-dot options icon which opens the options modal
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <MoreOptionsButton onPress={() => setIsModalVisible(true)} />
      ),
    });
  });

  const passedVideoInfo = route.params.videoInfo;

  const { state: contentState } = useContext(ContentContext);

  // Need to come up with a better, more efficient way of ensuring the screen
  // updates when the data updates.
  const videoInfo = contentState.items.filter(
    (item) => item._id === passedVideoInfo._id
  )[0];

  const {
    _id,
    name,
    authors,
    type,
    shelf,
    topics,
    description,
    thumbnailUrl,
    startFinishDates,
    dateAdded,
  } = videoInfo;

  // If data is loading, show Loader
  if (contentState.isFetching) {
    return <Loader />;
  }

  // List of buttons in the options modal
  const modalOptions = [
    {
      title: "Add or Edit Dates Watched",
      onPress: () => {
        setIsModalVisible(false);
        navigation.navigate("AddEditDates", {
          contentId: _id,
          contentType: type,
          startFinishDates: JSON.stringify(videoInfo.startFinishDates),
        });
      },
    },
  ];

  // Open video either on YouTube app or browser
  const handleOpenLink = () => {
    Linking.openURL(`https://youtu.be/${videoInfo.videoInfo.videoId}`);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: thumbnailUrl }}
          style={styles.thumbnail}
          resizeMode="contain"
        />
      </View>
      <TitleSection
        title={name}
        authors={authors}
        contentType={type}
        onPress={handleOpenLink}
      />
      <ActionSection
        contentId={_id}
        type={type}
        shelf={shelf}
        topics={topics}
        startFinishDates={startFinishDates}
        dateAdded={dateAdded}
        onPress={() =>
          navigation.navigate("ShelfSelect", {
            contentInfo: videoInfo,
            buttonText: "Confirm",
            addToLibrary: false,
          })
        }
      />
      <Description
        text={description}
        showMore={showMore}
        setShowMore={setShowMore}
      />
      <OptionsModal
        isVisible={isModalVisible}
        onBackdropPress={() => setIsModalVisible(false)}
        options={modalOptions}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: OFF_WHITE,
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
      },
      android: {
        elevation: 0,
      },
    }),
  },
  thumbnail: {
    borderRadius: 8,
    height: 150,
    width: 266.67,
    marginHorizontal: 15,
  },
});

export default VideoScreen;
