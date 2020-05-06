import React, { useContext, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import _ from "lodash";
// Context
import { Context as TopicsContext } from "../../context/TopicsContext";
// Components
import Loader from "../shared/Loader";
// Design
import { GRAY_2 } from "../../design/colors";
import { FS16, SEMIBOLD } from "../../design/typography";

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
        <Text style={styles.noDataText}>You haven't created any topics.</Text>
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
    fontFamily: SEMIBOLD,
    fontSize: FS16,
    color: GRAY_2,
  },
});

export default TopicsSection;
