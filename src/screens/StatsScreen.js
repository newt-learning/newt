import React, { useEffect, useContext } from "react";
import { View, StyleSheet } from "react-native";
// Context
import { Context as StatsContext } from "../context/StatsContext";
// Components
import { H2 } from "../components/Headers";
// Design
import { GRAY_5 } from "../design/colors";

const StatsScreen = () => {
  const { fetchSummaryStats } = useContext(StatsContext);

  // Fetch summary stats
  useEffect(() => {
    fetchSummaryStats();
  }, []);

  return (
    <View style={styles.container}>
      <H2>Stats</H2>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GRAY_5
  }
});

export default StatsScreen;
