import React, { useState } from "react";
import { ScrollView, View, StyleSheet, Text, Image } from "react-native";
import _ from "lodash";
import { Feather } from "@expo/vector-icons";
// Components
import SubHeader from "../../components/Content/SubHeader";
import Description from "../../components/Content/Description";
import SelectShelfSection from "../ShelfSelectScreen/SelectShelfSection";
import SelectTopicsSection from "../ShelfSelectScreen/SelectTopicsSection";
import ActionButton from "../../components/shared/ActionButton";
// Design
import { OFF_WHITE, GRAY_5, GRAY_3, GRAY_4 } from "../../design/colors";
import { REGULAR, FS14 } from "../../design/typography";
// Helpers
import { getBestThumbnail } from "./helpers";

const VideoConfirmation = ({
  videoInfo,
  setOnConfirmationSection,
  shelves,
  onSelectShelf,
  topics,
  onSelectTopic,
  onSubmit,
}) => {
  // Used to expand or contract the description text
  const [showMore, setShowMore] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    snippet: { title, description, thumbnails },
  } = videoInfo;

  const bestThumbnail = getBestThumbnail(thumbnails);

  // Placeholder image if there's no thumbnail provided
  const ThumbnailPlaceholder = () => (
    <View style={{ ...styles.thumbnail, ...styles.thumbnailPlaceholder }}>
      <Feather name="image" size={52} color={GRAY_3} />
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.confirmationContainer}>
      {bestThumbnail ? (
        <Image
          source={{ uri: bestThumbnail.url }}
          style={styles.thumbnail}
          resizeMode="contain"
        />
      ) : (
        <ThumbnailPlaceholder />
      )}
      <View style={styles.group}>
        <View style={{ padding: 5 }}>
          <SubHeader>Name</SubHeader>
          <Text style={styles.text}>{title}</Text>
        </View>
        <Description
          text={description}
          showMore={showMore}
          setShowMore={setShowMore}
          containerStyle={styles.description}
        />
      </View>
      <SelectShelfSection
        shelves={shelves}
        onSelectShelf={onSelectShelf}
        rounded
      />
      <SelectTopicsSection
        topicsList={topics}
        onSelectTopic={onSelectTopic}
        topicSelectContainer={{ marginHorizontal: 0 }}
      />
      <View style={styles.confirmBtnContainer}>
        <ActionButton
          title="Back"
          buttonStyle={styles.backBtn}
          onPress={() => setOnConfirmationSection(false)}
        />
        <ActionButton
          title="Confirm"
          buttonStyle={styles.confirmBtn}
          onPress={() => {
            setIsLoading(true);
            // Get chosen shelf
            const currentShelf = _.find(shelves, (shelf) => shelf.checked);
            // filter through the topics list to get only the checked ones, then
            // from those objects only take out the ids
            const selectedTopicIds = _.chain(topics)
              .filter({ checked: true })
              .map((item) => item._id);

            onSubmit(currentShelf.name, selectedTopicIds);
          }}
          showLoading={isLoading}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  confirmationContainer: {
    padding: 15,
    backgroundColor: GRAY_5,
  },
  group: {
    marginTop: 10,
    backgroundColor: OFF_WHITE,
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderRadius: 12,
  },
  thumbnail: {
    borderRadius: 8,
    height: 195,
    marginBottom: 10,
  },
  thumbnailPlaceholder: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    backgroundColor: GRAY_4,
  },
  description: {
    padding: 5,
    marginTop: 10,
    borderBottomWidth: 0,
  },
  confirmBtnContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 40,
    marginBottom: 20,
  },
  backBtn: {
    width: 125,
    backgroundColor: GRAY_3,
  },
  confirmBtn: {
    width: 125,
  },
  text: {
    fontFamily: REGULAR,
    fontSize: FS14,
  },
});

export default VideoConfirmation;
