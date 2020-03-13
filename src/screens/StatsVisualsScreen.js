import React from "react";
import { View, StyleSheet } from "react-native";
import { H2 } from "../components/Headers";

const StatsVisualsScreen = () => {
  return (
    <View style={styles.container}>
      <H2>Stats Visualizations</H2>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default StatsVisualsScreen;
