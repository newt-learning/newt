import React, { useContext } from "react";
import { View, StyleSheet } from "react-native";
import _ from "lodash";
// API
import { useFetchSeries } from "../api/series";
// Context
import { Context as ContentContext } from "../context/ContentContext";
// Components
import ContentList from "../components/ContentList";
// Helpers
import { filterAndOrderContentByShelf } from "../helpers/screenHelpers";

const IndividualShelfScreen = ({ route }) => {
  const {
    state: { items: contentItems },
  } = useContext(ContentContext);
  const { data: seriesData } = useFetchSeries();
  const { title } = route.params;

  const items = [...contentItems, ...seriesData];

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
