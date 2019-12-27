import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";

const MyLibraryScreen = () => {
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
