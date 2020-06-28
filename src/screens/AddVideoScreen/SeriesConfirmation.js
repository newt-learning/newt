import React, { useState } from "react";
import { Image, StyleSheet, View, Platform, FlatList } from "react-native";
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

const SeriesHeader = ({ thumbnail, name, authors, description }) => {
  // Used to expand or contract the description text
  const [showMore, setShowMore] = useState(false);

  return (
    <>
      {thumbnail ? (
        <View style={styles.thumbnailContainer}>
          <Image
            source={{ uri: thumbnail }}
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
    </>
  );
};

const SeriesConfirmation = ({ seriesInfo }) => {
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
    <FlatList
      ListHeaderComponent={
        <SeriesHeader
          thumbnail={bestThumbnail ? bestThumbnail.url : null}
          name={name}
          authors={authors}
          description={description}
        />
      }
      data={videos}
      renderItem={({ item, index }) => {
        const bestThumbnail = getBestThumbnail(item.snippet.thumbnails);
        // Rounded corners for first and last card
        const cardStyle = StyleSheet.compose([
          index === 0 && styles.firstVideoCard,
          index === videos.length - 1 && styles.lastVideoCard,
        ]);

        return (
          <ContentListCard
            title={item.snippet.title}
            thumbnailUrl={bestThumbnail ? bestThumbnail.url : null}
            cardStyle={cardStyle}
            titleContainerStyle={styles.videoCardTitleContainer}
          />
        );
      }}
      keyExtractor={(item) => item.snippet.resourceId.videoId}
      contentContainerStyle={styles.confirmationContainer}
    />
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
  videoCardTitleContainer: {
    justifyContent: "center",
  },
  firstVideoCard: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  lastVideoCard: {
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    borderBottomWidth: 0,
  },
});

export default SeriesConfirmation;
