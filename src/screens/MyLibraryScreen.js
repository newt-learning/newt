import React, { useContext, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Context as ContentContext } from "../context/ContentContext";

const MyLibraryScreen = () => {
  const { state, fetchContent } = useContext(ContentContext);

  // Fetch content data
  useEffect(() => {
    fetchContent();
  }, []);

  return <Text style={styles.text}>My Library</Text>;
};

const styles = StyleSheet.create({
  text: {
    marginTop: 50,
    fontSize: 48
  }
});

MyLibraryScreen.navigationOptions = {
  tabBarIcon: ({ tintColor }) => (
    <Feather name="book-open" size={20} color={tintColor} />
  )
};

export default MyLibraryScreen;
