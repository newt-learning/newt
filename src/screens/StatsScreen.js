import React, { useEffect, useContext } from "react";
import { View, ScrollView, StyleSheet, RefreshControl } from "react-native";
import _ from "lodash";
// Context
import { Context as StatsContext } from "../context/StatsContext";
import { Context as ContentContext } from "../context/ContentContext";
// Components
import { H2 } from "../components/shared/Headers";
import StatsSummaryCard from "../components/Stats/StatsSummaryCard";
import Loader from "../components/shared/Loader";
import NoContentMessage from "../components/shared/NoContentMessage";
import ErrorMessage from "../components/shared/ErrorMessage";
// Hooks
import useRefresh from "../hooks/useRefresh";
// Design
import { GRAY_5 } from "../design/colors";

const StatsScreen = ({ navigation }) => {
  const {
    state: { isFetching, summaryStats, errorMessage },
    fetchSummaryStats,
  } = useContext(StatsContext);
  const {
    state: { items },
  } = useContext(ContentContext);
  const [refreshing, onPullToRefresh] = useRefresh(fetchSummaryStats);

  // Fetch summary stats
  useEffect(() => {
    fetchSummaryStats();
  }, []);

  // If data is being fetched AND it's not initiated from a user refresh call
  // then show the full screen loader.
  if (isFetching && !refreshing) {
    return <Loader isLoading={isFetching} />;
  }

  // If there's an error message display error message screen
  if (errorMessage) {
    return <ErrorMessage message={errorMessage} />;
  }

  // If there's no data and it's not currently being fetched, show the "No Content"
  // message
  if (!isFetching && _.isEmpty(items)) {
    return <NoContentMessage />;
  }

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onPullToRefresh} />
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
