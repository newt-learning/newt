import React, { useState } from "react";
import { ScrollView, View, StyleSheet, Image } from "react-native";
// Components
import TitleSection from "../components/Content/TitleSection";
import ActionSection from "../components/Content/ActionSection";
import Description from "../components/Content/Description";
// Design
import { OFF_WHITE } from "../design/colors";

const VideoScreen = ({ route }) => {
  // Toggle show more/less description text
  const [showMore, setShowMore] = useState(false);

  const { videoInfo } = route.params;
  const {
    _id,
    name,
    authors,
    shelf,
    topics,
    description,
    thumbnailUrl,
    dateAdded,
  } = videoInfo;

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
        shelf={shelf}
        topics={topics}
        dateAdded={dateAdded}
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
    paddingTop: 15,
    paddingBottom: 5,
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
    height: 195,
    marginHorizontal: 15,
  },
});

export default VideoScreen;
