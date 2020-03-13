import React, { useEffect, useContext } from "react";
import { View, StyleSheet } from "react-native";
// Context
import { Context as StatsContext } from "../context/StatsContext";
// Components
import StatsSummaryCard from "../components/StatsSummaryCard";
import Loader from "../components/Loader";
// Design
import { GRAY_5 } from "../design/colors";

const StatsScreen = ({ navigation }) => {
  const {
    state: { isFetching, summaryStats },
    fetchSummaryStats
  } = useContext(StatsContext);

  // Fetch summary stats
  useEffect(() => {
    fetchSummaryStats();
  }, []);

  if (isFetching) {
    return <Loader isLoading={isFetching} />;
  }

  return (
    <View style={styles.container}>
      <StatsSummaryCard
        contentType="Books"
        summarySentence={summaryStats.books}
        onPress={() => navigation.navigate("StatsVisuals")}
      />
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
