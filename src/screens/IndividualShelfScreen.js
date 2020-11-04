import React from "react";
import { View, StyleSheet } from "react-native";
import _ from "lodash";
// API
import { useFetchAllContent } from "../api/content";
import { useFetchSeries } from "../api/series";
// Components
import ContentList from "../components/ContentList";
// Helpers
import { filterAndOrderContentByShelf } from "../helpers/screenHelpers";

const IndividualShelfScreen = ({ route }) => {
  const { data: allContentData } = useFetchAllContent();
  const { data: seriesData } = useFetchSeries();
  const { title } = route.params;

  const items = [...allContentData, ...seriesData];

  return (
    <View style={styles.container}>
      <ContentList data={filterAndOrderContentByShelf(title, items)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default IndividualShelfScreen;
