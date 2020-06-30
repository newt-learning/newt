import React, { useContext } from "react";
import { View, StyleSheet } from "react-native";
import _ from "lodash";
// Context
import { Context as ContentContext } from "../context/ContentContext";
// Components
import ContentList from "../components/ContentList";

const IndividualShelfScreen = ({ route }) => {
  const {
    state: { items },
  } = useContext(ContentContext);
  const { title } = route.params;

  const filterAndOrderContentByShelf = (shelf) => {
    const filteredContent = _.filter(
      items,
      (item) => item.shelf === shelf && !item.partOfSeries
    );
    return _.orderBy(filteredContent, "lastUpdated", "desc");
  };

  return (
    <View style={styles.container}>
      <ContentList data={filterAndOrderContentByShelf(title)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default IndividualShelfScreen;
