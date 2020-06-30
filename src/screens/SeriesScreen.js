import React, { useState, useContext } from "react";
import {
  StyleSheet,
  View,
  Platform,
  FlatList,
  TouchableHighlight,
} from "react-native";
import _ from "lodash";
// Context
import { Context as ContentContext } from "../context/ContentContext";
// Components
import StackedImages from "../components/shared/StackedImages";
import { H3 } from "../components/shared/Headers";
import TitleSection from "../components/Content/TitleSection";
import Description from "../components/Content/Description";
import ContentListCard from "../components/ContentListCard";
import ClearButton from "../components/shared/ClearButton";
// Design
import { GRAY_5, OFF_WHITE } from "../design/colors";
// Helpers
import { handleContentNavigation } from "../helpers/screenHelpers";

const SeriesHeader = ({
  thumbnailUrls,
  name,
  authors,
  description,
  numOfVideos,
}) => {
  // Used to expand or contract the description text
  const [showMore, setShowMore] = useState(false);

  return (
    <>
      {!_.isEmpty(thumbnailUrls) ? (
        <View style={styles.thumbnailContainer}>
          <StackedImages imageUrls={thumbnailUrls} />
        </View>
      ) : null}
      <TitleSection
        title={name}
        authors={authors}
        subtitle={`${numOfVideos} videos`}
        noBottomBorder
      />
      <View style={styles.group}>
        <Description
          text={description}
          showMore={showMore}
          setShowMore={setShowMore}
          numCharacters={200}
          containerStyle={styles.description}
        />
      </View>
      <H3 style={{ marginTop: 15, marginBottom: 5, marginLeft: 10 }}>Videos</H3>
    </>
  );
};

const SeriesFooter = ({ numOfVideos, showAllVideos, onPressSeeAll }) => {
  return (
    <>
      {numOfVideos > 5 ? (
        <TouchableHighlight style={styles.seeAllVideos}>
          <ClearButton
            title={showAllVideos ? "See less" : "See all"}
            onPress={onPressSeeAll}
          />
        </TouchableHighlight>
      ) : null}
    </>
  );
};

const SeriesScreen = ({ route, navigation }) => {
  const { seriesInfo } = route.params;
  const { name, authors, description, thumbnailUrl, contentIds } = seriesInfo;

  // Get content data to get videos from
  const {
    state: { items: contentItems },
  } = useContext(ContentContext);

  // Get only items that are in contentIds array (videos in series)
  const videos = _.filter(contentItems, (contentItem) =>
    _.includes(contentIds, contentItem._id)
  );
  const numOfVideos = videos.length;
  const initialVideosToRender = numOfVideos > 5 ? 5 : numOfVideos;

  // Get the first 3 thumbnail URLs to display in the stacked image
  let thumbnailUrls = [];
  for (let i = 0; i < 3; i++) {
    thumbnailUrls.push(videos[i].thumbnailUrl);
  }
  // Toggle between seeing first 5 or all videos
  const [showAllVideos, setShowAllVideos] = useState(false);

  return (
    <FlatList
      ListHeaderComponent={
        <SeriesHeader
          thumbnailUrls={thumbnailUrls}
          name={name}
          authors={authors}
          description={description}
          numOfVideos={numOfVideos}
        />
      }
      data={showAllVideos ? videos : videos.slice(0, initialVideosToRender)}
      renderItem={({ item, index }) => {
        // Rounded corners for first and last card
        const cardStyle = StyleSheet.compose([
          index === 0 && styles.firstVideoCard,
          numOfVideos <= 5 && index === numOfVideos - 1
            ? styles.lastVideoCard
            : null,
        ]);

        return (
          <ContentListCard
            title={item.name}
            thumbnailUrl={item.thumbnailUrl}
            cardStyle={cardStyle}
            titleContainerStyle={styles.videoCardTitleContainer}
            onPress={() => handleContentNavigation(item, navigation)}
          />
        );
      }}
      keyExtractor={(item) => item._id}
      ListFooterComponent={
        <SeriesFooter
          numOfVideos={numOfVideos}
          showAllVideos={showAllVideos}
          onPressSeeAll={() => setShowAllVideos(!showAllVideos)}
        />
      }
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
    marginTop: 20,
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
    borderBottomRightRadius: 12,
    borderBottomLeftRadius: 12,
    borderBottomWidth: 0,
  },
  seeAllVideos: {
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    backgroundColor: OFF_WHITE,
  },
});

export default SeriesScreen;
