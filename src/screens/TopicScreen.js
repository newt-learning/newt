import React from "react";
import { View, Text, StyleSheet } from "react-native";
import _ from "lodash";
// Design
import { SEMIBOLD, FS16 } from "../design/typography";
import { GRAY_2 } from "../design/colors";

const TopicScreen = ({ route }) => {
  const { topicInfo } = route.params;

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

  return (
    <View style={styles.container}>
      <Text>Topic screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 15,
  },
  noDataText: {
    marginTop: 20,
    fontFamily: SEMIBOLD,
    fontSize: FS16,
    color: GRAY_2,
    textAlign: "center",
  },
});

export default TopicScreen;
