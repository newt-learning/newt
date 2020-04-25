import React, { useState, useEffect, useContext } from "react";
import { View, StyleSheet } from "react-native";
// Context
import { Context as StatsContext } from "../context/StatsContext";
// Components
import ButtonGroup from "../components/ButtonGroup";
import OldBarChart from "../components/StatsBarChart";
import Loader from "../components/Loader";
import StatsSummaryCard from "../components/StatsSummaryCard";
// Design
import { OFF_WHITE, GRAY_5 } from "../design/colors";

// Main component to show in screen under Button Group
const StatsVizualization = ({ data, selectedButtonIndex }) => {
  // If selectedButtonIndex is out of range for whatever reason (it should never be), return nothing
  if (selectedButtonIndex < 0 || selectedButtonIndex >= 4) {
    return null;
  }

  // For the day visual, show a summary card for each content type. Otherwise for the rest, show the bar chart
  if (selectedButtonIndex === 0) {
    return data.map((item) => {
      const sentence = `${item.value} ${item.unit} today.`;
      return (
        <StatsSummaryCard
          key={item.contentType}
          contentType={item.contentType}
          summarySentence={sentence}
          cardStyle={{ backgroundColor: GRAY_5 }}
          showChevron={false}
        />
      );
    });
  } else {
    // return <NewBarChart data={data} />;
    return <OldBarChart data={data} containerStyle={styles.chart} />;
  }
};

const StatsVisualsScreen = () => {
  const [selectedButtonIndex, setSelectedButtonIndex] = useState(1);
  const {
    state: { isFetching, periodStats },
    fetchStatsByPeriod,
  } = useContext(StatsContext);
  const buttons = ["D", "W", "M", "Y"];
  const periods = ["day", "week", "month", "year"];

  useEffect(() => {
    fetchStatsByPeriod(periods[selectedButtonIndex]);
  }, [selectedButtonIndex]);

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
        <Loader isLoading={isFetching} backgroundColor={OFF_WHITE} />
      ) : (
        <StatsVizualization
          data={periodStats[periods[selectedButtonIndex]]}
          selectedButtonIndex={selectedButtonIndex}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: OFF_WHITE,
    paddingTop: 10,
  },
  buttonGroup: {
    marginHorizontal: 15,
  },
  chart: {
    marginTop: 20,
    marginHorizontal: 15,
  },
});

export default StatsVisualsScreen;
