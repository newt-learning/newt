import React from "react";
import { View, Text, StyleSheet } from "react-native";

const TopicScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Topic screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default TopicScreen;
