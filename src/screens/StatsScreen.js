import React, { useEffect, useContext, useCallback, useState } from "react";
import { View, ScrollView, StyleSheet, RefreshControl } from "react-native";
// Context
import { Context as StatsContext } from "../context/StatsContext";
// Components
import { H2 } from "../components/Headers";
import StatsSummaryCard from "../components/StatsSummaryCard";
import Loader from "../components/Loader";
// Design
import { GRAY_5 } from "../design/colors";

const StatsScreen = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const {
    state: { isFetching, summaryStats },
    fetchSummaryStats,
  } = useContext(StatsContext);

  // Fetch summary stats
  useEffect(() => {
    fetchSummaryStats();
  }, []);

  // Function that's called when user scrolls down to refresh screen
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchSummaryStats();
    setRefreshing(false);
  }, [isFetching]);

  // If data is being fetched AND it's not initiated from a user refresh call
  // then show the full screen loader.
  if (isFetching && !refreshing) {
    return <Loader isLoading={isFetching} />;
  }

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <H2 style={styles.title}>By Content</H2>
        <StatsSummaryCard
          contentType="Books"
          summarySentence={summaryStats.books}
          onPress={() =>
            navigation.navigate("StatsVisuals", { title: "Books" })
          }
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GRAY_5,
  },
  title: {
    marginTop: 20,
    marginHorizontal: 15,
  },
});

export default StatsScreen;
