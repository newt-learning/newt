import React, { useState } from "react";
import { ScrollView, View, StyleSheet, Text, Image } from "react-native";
// Components
import SubHeader from "../../components/Content/SubHeader";
import Description from "../../components/Content/Description";
import SelectShelfSection from "../ShelfSelectScreen/SelectShelfSection";
import SelectTopicsSection from "../ShelfSelectScreen/SelectTopicsSection";
import ActionButton from "../../components/shared/ActionButton";
// Design
import { OFF_WHITE, GRAY_5, GRAY_3 } from "../../design/colors";
import { REGULAR, FS14 } from "../../design/typography";

const VideoConfirmation = ({
  videoInfo,
  setOnConfirmationSection,
  shelves,
  onSelectShelf,
  topics,
  onSelectTopic,
}) => {
  // Used to expand or contract the description text
  const [showMore, setShowMore] = useState(false);

  const {
    snippet: { title, description },
  } = videoInfo;

  return (
    <ScrollView contentContainerStyle={styles.confirmationContainer}>
      <Image
        source={{ uri: videoInfo.snippet.thumbnails.maxres.url }}
        style={styles.thumbnail}
        resizeMode="contain"
      />
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
        <ActionButton title="Confirm" buttonStyle={styles.confirmBtn} />
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
