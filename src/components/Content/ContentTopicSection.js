import React, { useContext } from "react";
import { View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import _ from "lodash";
// Context
import { Context as TopicsContext } from "../../context/TopicsContext";
// Components
import Pill from "../shared/Pill";
// Design
import { FS12 } from "../../design/typography";

const AddToTopicPill = ({ contentId, contentTopics }) => {
  const navigation = useNavigation();

  return (
    <Pill
      title="Add topic"
      addPill={true}
      onPress={() =>
        navigation.navigate("AddToTopic", {
          contentId,
          contentTopics,
        })
      }
    />
  );
};

const ContentTopicSection = ({ contentId, topics }) => {
  const {
    state: { items },
  } = useContext(TopicsContext);

  if (_.isEmpty(topics)) {
    return (
      <View style={styles.topicsContainer}>
        <AddToTopicPill contentId={contentId} contentTopics={topics} />
      </View>
    );
  }

  return (
    <View style={styles.topicsContainer}>
      {topics.map((topicId) => (
        <Pill title={_.find(items, { _id: topicId }).name} key={topicId} />
      ))}
      <AddToTopicPill contentId={contentId} contentTopics={topics} />
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