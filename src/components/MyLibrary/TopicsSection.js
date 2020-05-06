import React, { useContext, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import _ from "lodash";
// Context
import { Context as TopicsContext } from "../../context/TopicsContext";
// Components
import Loader from "../shared/Loader";
import CreateTopicButton from "./CreateTopicButton";
// Design
import { GRAY_2 } from "../../design/colors";
import { SEMIBOLD, FS14 } from "../../design/typography";

const TopicsSection = () => {
  const {
    state: { isFetching, items },
    fetchTopics,
  } = useContext(TopicsContext);

  // Fetch topics data
  useEffect(() => {
    fetchTopics();
  }, []);

  if (isFetching) {
    return <Loader />;
  }

  if (!isFetching && _.isEmpty(items)) {
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
