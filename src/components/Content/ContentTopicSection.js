import React from "react";
import { View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import _ from "lodash";
// Components
import CreateTopicButton from "../MyLibrary/CreateTopicButton";
import Pill from "../shared/Pill";
// Design
import { FS12 } from "../../design/typography";
import { RUBY_2 } from "../../design/colors";

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

  return (
    <View style={styles.topicsContainer}>
      {topics.map((topic) => (
        <Pill
          title={topic.substr(0, 17)}
          backgroundColor={RUBY_2}
          outlineColor={RUBY_2}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  topicsContainer: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
  },
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
