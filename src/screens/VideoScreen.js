import React, { useState, useContext } from "react";
import { ScrollView, View, StyleSheet, Image } from "react-native";
// Context
import { Context as ContentContext } from "../context/ContentContext";
// Components
import Loader from "../components/shared/Loader";
import TitleSection from "../components/Content/TitleSection";
import ActionSection from "../components/Content/ActionSection";
import Description from "../components/Content/Description";
// Design
import { OFF_WHITE } from "../design/colors";

const VideoScreen = ({ route, navigation }) => {
  // Toggle show more/less description text
  const [showMore, setShowMore] = useState(false);

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
    dateAdded,
  } = videoInfo;

  // If data is loading, show Loader
  if (contentState.isFetching) {
    return <Loader />;
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: thumbnailUrl }}
          style={styles.thumbnail}
          resizeMode="contain"
        />
      </View>
      <TitleSection title={name} authors={authors} />
      <ActionSection
        contentId={_id}
        type={type}
        shelf={shelf}
        topics={topics}
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
