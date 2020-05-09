import React from "react";
import { View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import _ from "lodash";
import CreateTopicButton from "../MyLibrary/CreateTopicButton";
import { FS12 } from "../../design/typography";

const AddToTopicButton = ({ contentId, contentTopics }) => {
  const navigation = useNavigation();

  return (
    <CreateTopicButton
      title="Add topic"
      onPress={() =>
        navigation.navigate("AddToTopic", { contentId, contentTopics })
      }
      buttonStyle={styles.addToTopicBtn}
      titleStyle={styles.addToTopicBtnTitle}
      iconSize={18}
    />
  );
};

const ContentTopicSection = ({ contentId, topics }) => {
  if (_.isEmpty(topics)) {
    return <AddToTopicButton contentId={contentId} contentTopics={topics} />;
  }

  return <View></View>;
};

const styles = StyleSheet.create({
  addToTopicBtn: {
    borderRadius: 30,
    paddingVertical: 3,
    paddingHorizontal: 15,
    alignSelf: "center",
  },
  addToTopicBtnTitle: {
    fontSize: FS12,
    marginLeft: 8,
  },
});

export default ContentTopicSection;
