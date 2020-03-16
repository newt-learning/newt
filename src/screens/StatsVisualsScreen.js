import React, { useState } from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
// Components
import ButtonGroup from "../components/ButtonGroup";
import { NavHeaderTitle } from "../components/Headers";
import BarChart from "../components/StatsBarChart";
// Design
import { OFF_WHITE } from "../design/colors";

const StatsVisualsScreen = () => {
  const [selectedButtonIndex, setSelectedButtonIndex] = useState(1);
  const buttons = ["D", "W", "M", "Y"];

  return (
    <View style={styles.container}>
      <ButtonGroup
        buttonsArray={buttons}
        selectedIndex={selectedButtonIndex}
        onPress={setSelectedButtonIndex}
        containerStyle={styles.buttonGroup}
      />
      {/* Temporary. The actual implementation should just pass data props to BarChart */}
      {selectedButtonIndex === 1 ? (
        <BarChart containerStyle={styles.chart} />
      ) : (
        <Text style={styles.chart}>🚧 Under construction 🚧</Text>
      )}
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
