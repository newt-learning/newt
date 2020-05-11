import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import _ from "lodash";
// Context
import { Context as ContentContext } from "../context/ContentContext";
// Components
import ContentList from "../components/ContentList";
// Design
import { SEMIBOLD, FS16 } from "../design/typography";
import { GRAY_2 } from "../design/colors";

const TopicScreen = ({ route }) => {
  const { topicInfo } = route.params;
  const { state: contentState } = useContext(ContentContext);

  // If the topic has no content saved, show no content message
  if (_.isEmpty(topicInfo.content)) {
    return (
      <View style={styles.container}>
        <Text style={styles.noDataText}>
          There is no content saved under this topic.
        </Text>
      </View>
    );
  }

  // The topicInfo prop passed down has an array of contentIds which belong to
  // this topic. For each contentId, find the content data and create an array
  // of all content data to be passed to ContentList component (should really
  // be done server-side or through state management, but client-side is a
  // quicker temp. solution).
  const contentData = _.map(topicInfo.content, (contentId) => {
    return _.find(contentState.items, { _id: contentId });
  });

  return <ContentList data={contentData} />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  noDataText: {
    marginHorizontal: 15,
    marginTop: 20,
    fontFamily: SEMIBOLD,
    fontSize: FS16,
    color: GRAY_2,
    textAlign: "center",
  },
});

export default TopicScreen;
