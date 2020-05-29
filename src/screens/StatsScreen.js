import React, { useState, useContext } from "react";
import { View, ScrollView, StyleSheet, RefreshControl } from "react-native";
import _ from "lodash";
// Context
import { Context as ContentContext } from "../context/ContentContext";
// Components
import { H2 } from "../components/shared/Headers";
import StatsSummaryCard from "../components/Stats/StatsSummaryCard";
import ChallengeCard from "../components/Stats/ChallengeCard";
import Loader from "../components/shared/Loader";
import NoContentMessage from "../components/shared/NoContentMessage";
import ErrorMessage from "../components/shared/ErrorMessage";
// Hooks
import useSummaryStats from "../hooks/useSummaryStats";
// API
import { useFetchChallenges } from "../api/challenges";
// Design
import { GRAY_5 } from "../design/colors";

const StatsScreen = ({ navigation }) => {
  const {
    state: { items },
  } = useContext(ContentContext);
  const [refreshing, setRefreshing] = useState(false);

  // Get stats data + status, error, etc.
  const { status, data, error, refetch, isFetching } = useSummaryStats();

  // Get challenges data + related stuff
  const {
    status: challengesStatus,
    data: challengesData,
    error: challengesError,
  } = useFetchChallenges();

  // Can't use useRefresh hook so brought it out here
  const onPullToRefresh = () => {
    setRefreshing(true);
    refetch();
    setRefreshing(false);
  };

  // If data is being fetched AND it's not initiated from a user refresh call
  // then show the full screen loader.
  if ((status === "loading" || challengesStatus === "loading") && !refreshing) {
    return <Loader />;
  }

  // If there's an error message display error message screen
  if (error) {
    return <ErrorMessage message={error.message} onRetry={refetch} />;
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
          summarySentence={data.books}
          onPress={() =>
            navigation.navigate("StatsVisuals", { title: "Books" })
          }
        />
        <H2 style={styles.title}>Challenges</H2>
        <ChallengeCard data={challengesData} />
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
