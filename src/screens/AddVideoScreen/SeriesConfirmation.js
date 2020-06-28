import React, { useState } from "react";
import { ScrollView, Image, StyleSheet, View, Platform } from "react-native";
import _ from "lodash";
// Components
import { H3 } from "../../components/shared/Headers";
import TitleSection from "../../components/Content/TitleSection";
import Description from "../../components/Content/Description";
import ContentListCard from "../../components/ContentListCard";
// Design
import { GRAY_5, OFF_WHITE } from "../../design/colors";
// Helpers
import { getBestThumbnail } from "./helpers";

const SeriesConfirmation = ({ seriesInfo }) => {
  // Used to expand or contract the description text
  const [showMore, setShowMore] = useState(false);

  const {
    name,
    authors,
    description,
    videos,
    seriesInfo: { thumbnails },
  } = seriesInfo;

  // thumbnail for playlist
  const bestThumbnail = getBestThumbnail(thumbnails);

  return (
    <ScrollView contentContainerStyle={styles.confirmationContainer}>
      {bestThumbnail ? (
        <View style={styles.thumbnailContainer}>
          <Image
            source={{ uri: bestThumbnail.url }}
            style={styles.thumbnail}
            resizeMode="contain"
          />
        </View>
      ) : null}
      <TitleSection title={name} authors={authors} noBottomBorder />
      <View style={styles.group}>
        <Description
          text={description}
          showMore={showMore}
          setShowMore={setShowMore}
          containerStyle={styles.description}
        />
      </View>
      <H3 style={{ marginTop: 15, marginBottom: 5 }}>Videos</H3>
      {_.map(videos, (video) => {
        const bestThumbnail = getBestThumbnail(video.snippet.thumbnails);

        return (
          <ContentListCard
            title={video.snippet.title}
            thumbnailUrl={bestThumbnail ? bestThumbnail.url : null}
            key={video.snippet.resourceId.videoId}
          />
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  confirmationContainer: {
    padding: 15,
    backgroundColor: GRAY_5,
  },
  thumbnailContainer: {
    justifyContent: "center",
    alignItems: "center",
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
    marginBottom: 10,
  },
  group: {
    marginTop: 10,
    backgroundColor: OFF_WHITE,
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderRadius: 12,
  },
  description: {
    padding: 5,
    borderBottomWidth: 0,
  },
});

export default SeriesConfirmation;
