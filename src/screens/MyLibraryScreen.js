import React, { useContext, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Context as ContentContext } from "../context/ContentContext";
import Shelf from "../components/Shelf";

const MyLibraryScreen = () => {
  const { state, fetchContent } = useContext(ContentContext);

  // Fetch content data
  useEffect(() => {
    fetchContent();
  }, []);

  return (
    <View style={styles.container}>
      <Shelf name="Currently Learning" />
      <Shelf name="Want to Learn" />
      <Shelf name="Finished Learning" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default MyLibraryScreen;
