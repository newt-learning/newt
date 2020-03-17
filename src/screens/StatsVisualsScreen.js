import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
// Context
import { Context as StatsContext } from "../context/StatsContext";
// Components
import ButtonGroup from "../components/ButtonGroup";
import { NavHeaderTitle } from "../components/Headers";
import BarChart from "../components/StatsBarChart";
import Loader from "../components/Loader";
// Design
import { OFF_WHITE } from "../design/colors";

const StatsVisualsScreen = () => {
  const [selectedButtonIndex, setSelectedButtonIndex] = useState(1);
  const {
    state: { isFetching, periodStats },
    fetchStatsByPeriod
  } = useContext(StatsContext);
  const buttons = ["D", "W", "M", "Y"];
  const periods = ["day", "week", "month", "year"];

  useEffect(() => {
    fetchStatsByPeriod(periods[selectedButtonIndex]);
  }, [selectedButtonIndex]);

  // Main component to show in screen under Button Group
  const Chart = ({ data, selectedButtonIndex }) => {
    if (selectedButtonIndex == 1) {
      return <BarChart data={data} containerStyle={styles.chart} />;
    } else {
      return <Text style={styles.chart}>🚧 Under construction 🚧</Text>;
    }
  };

  return (
    <View style={styles.container}>
      <ButtonGroup
        buttonsArray={buttons}
        selectedIndex={selectedButtonIndex}
        onPress={setSelectedButtonIndex}
        containerStyle={styles.buttonGroup}
      />
      {/* If fetching, show Loader. Otherwise show the Chart component */}
      {isFetching ? (
        <Loader isLoading={isFetching} />
      ) : (
        <Chart
          data={periodStats[periods[selectedButtonIndex]]}
          selectedButtonIndex={selectedButtonIndex}
        />
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
