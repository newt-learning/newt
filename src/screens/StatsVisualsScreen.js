import React from "react";
import { View, StyleSheet, Platform } from "react-native";
// Components
import ButtonGroup from "../components/ButtonGroup";
import { NavHeaderTitle } from "../components/Headers";
import BarChart from "../components/StatsBarChart";
// Design
import { OFF_WHITE } from "../design/colors";

const StatsVisualsScreen = () => {
  const buttons = ["D", "W", "M", "Y"];

  return (
    <View style={styles.container}>
      <ButtonGroup buttonsArray={buttons} containerStyle={styles.buttonGroup} />
      <BarChart containerStyle={styles.chart} />
    </View>
  );
};

StatsVisualsScreen.navigationOptions = ({ navigation }) => {
  // Get title from params
  const { title } = navigation.state.params;

  return {
    headerTitle:
      Platform.OS === "ios" ? <NavHeaderTitle title={title} /> : title,
    headerStyle: {
      backgroundColor: OFF_WHITE
    }
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10
  },
  buttonGroup: {
    marginHorizontal: 15
  },
  chart: {
    marginTop: 20,
    marginHorizontal: 15
  }
});

export default StatsVisualsScreen;
