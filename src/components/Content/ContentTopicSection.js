import React from "react";
import { View, StyleSheet } from "react-native";
import _ from "lodash";
import CreateTopicButton from "../MyLibrary/CreateTopicButton";
import { FS12 } from "../../design/typography";

const AddToTopicButton = () => {
  return (
    <CreateTopicButton
      title="Add to topic"
      onPress={() => console.log("Add to topic")}
      buttonStyle={styles.addToTopicBtn}
      titleStyle={styles.addToTopicBtnTitle}
      iconSize={18}
    />
  );
};

const ContentTopicSection = ({ topics }) => {
  if (_.isEmpty(topics)) {
    return <AddToTopicButton />;
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
