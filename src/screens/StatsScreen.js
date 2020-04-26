import React, { useEffect, useContext, useCallback, useState } from "react";
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
// Design
import { GRAY_5 } from "../design/colors";

const StatsScreen = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const {
    state: { isFetching, summaryStats },
    fetchSummaryStats,
  } = useContext(StatsContext);
  const {
    state: { items },
  } = useContext(ContentContext);

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
