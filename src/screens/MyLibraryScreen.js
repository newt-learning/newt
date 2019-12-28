import React, { useContext, useEffect } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  ActivityIndicator
} from "react-native";
import _ from "lodash";
import { Feather } from "@expo/vector-icons";
// Context
import { Context as ContentContext } from "../context/ContentContext";
// Components
import Shelf from "../components/Shelf";
import Loader from "../components/Loader";
// Design
import { GRAY_5 } from "../design/colors";

const MyLibraryScreen = () => {
  const {
    state: { isFetching, items },
    fetchContent
  } = useContext(ContentContext);

  const filterContentByShelf = shelf => {
    const filteredArr = _.filter(items, item => item.shelf === shelf);
    // Return only first 4 items
    return filteredArr.slice(0, 4);
  };

  // Fetch content data
  useEffect(() => {
    fetchContent();
  }, []);

  if (isFetching) {
    return <Loader isLoading={isFetching} />;
  }

  return (
    <ScrollView style={styles.container}>
      <Shelf
        name="Currently Learning"
        data={filterContentByShelf("Currently Learning")}
      />
      <Shelf
        name="Want to Learn"
        data={filterContentByShelf("Want to Learn")}
      />
      <Shelf
        name="Finished Learning"
        data={filterContentByShelf("Finished Learning")}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GRAY_5
  }
});

export default MyLibraryScreen;
