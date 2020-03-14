import React from "react";
import { View, StyleSheet } from "react-native";
// Components
import ButtonGroup from "../components/ButtonGroup";

const StatsVisualsScreen = () => {
  const buttons = ["D", "W", "M", "Y"];

  return (
    <View style={styles.container}>
      <ButtonGroup buttonsArray={buttons} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10
  }
});

export default StatsVisualsScreen;
