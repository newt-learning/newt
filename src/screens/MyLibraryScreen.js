import React, { useContext, useEffect } from "react";
import { ScrollView, Text, StyleSheet } from "react-native";
import _ from "lodash";
import { Feather } from "@expo/vector-icons";
import { Context as ContentContext } from "../context/ContentContext";
import Shelf from "../components/Shelf";

const MyLibraryScreen = () => {
  const {
    state: { items },
    fetchContent
  } = useContext(ContentContext);

  const filterContentByShelf = shelf => {
    return _.filter(items, item => item.shelf === shelf);
  };

  // Fetch content data
  useEffect(() => {
    fetchContent();
  }, []);

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
    flex: 1
  }
});

export default MyLibraryScreen;
