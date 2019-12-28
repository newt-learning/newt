import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { BOLD, FS24 } from "../design/typography";

const Shelf = ({ name }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginHorizontal: 15
  },
  title: {
    fontFamily: BOLD,
    fontSize: FS24
  }
});

export default Shelf;
