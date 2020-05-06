import React from "react";
import { View, Text, StyleSheet } from "react-native";
import _ from "lodash";
// Components
import CreateTopicButton from "./CreateTopicButton";
// Design
import { GRAY_2 } from "../../design/colors";
import { SEMIBOLD, FS14 } from "../../design/typography";

const TopicsSection = ({ items }) => {
  if (_.isEmpty(items)) {
    return (
      <View style={styles.container}>
        <Text style={styles.noDataText}>
          Looks like you haven't created any topics. You can use them to
          organize your content into... topics!
        </Text>
        <CreateTopicButton />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text>Topics...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 15,
    marginTop: 15,
  },
  noDataText: {
    textAlign: "center",
    fontFamily: SEMIBOLD,
    fontSize: FS14,
    color: GRAY_2,
  },
});

export default TopicsSection;
