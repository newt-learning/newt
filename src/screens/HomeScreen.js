import React, { useContext, useEffect } from "react";
import { Text, StyleSheet, FlatList } from "react-native";
import _ from "lodash";
// Context
import { Context as ContentContext } from "../context/ContentContext";
import { Context as TopicsContext } from "../context/TopicsContext";
// Components
import { H1 } from "../components/shared/Headers";
import Loader from "../components/shared/Loader";
import ErrorMessage from "../components/shared/ErrorMessage";
import HomeContentCard from "../components/Home/HomeContentCard";
import ClearButton from "../components/shared/ClearButton";
import NoContentMessage from "../components/shared/NoContentMessage";
// Hooks
import useRefresh from "../hooks/useRefresh";
// Styling
import { REGULAR, FS16, FS14 } from "../design/typography";
import { GRAY_2, GRAY_5, NEWT_BLUE } from "../design/colors";
// Helpers
import {
  calculatePercentComplete,
  handleContentNavigation,
} from "../helpers/screenHelpers";

const HomeScreen = ({ navigation }) => {
  const { state: contentState, fetchContent } = useContext(ContentContext);
  const { state: topicsState, fetchTopics } = useContext(TopicsContext);
  const [refreshing, onPullToRefresh] = useRefresh(fetchContent);

  // Fetch content data
  useEffect(() => {
    fetchContent();
    fetchTopics();
  }, []);

  console.log("content fetching state: ", contentState.isFetching);
  console.log("topic fetching state: ", topicsState.isFetching);

  // Message if there's data/content but none in the "Currently Learning" shelf
  const NoCurrentlyLearningMessage = () => (
    <>
      <Text style={styles.noCurrentContentText}>
        Move a book, article, or video to the Currently Learning shelf to track
        your progress.
      </Text>
      <ClearButton
        title="Go to My Library"
        titleStyle={{ fontSize: FS14, color: NEWT_BLUE }}
        containerStyle={{ marginTop: 15 }}
        onPress={() => navigation.navigate("My Library")}
      />
    </>
  );

  // If data is being fetched, show loading spinner
  if ((contentState.isFetching || topicsState.isFetching) && !refreshing) {
    return <Loader />;
  }

  // If there's an error message display error message screen
  if (contentState.errorMessage) {
    return (
      <ErrorMessage
        message={contentState.errorMessage}
        onRetry={() => {
          fetchContent();
          fetchTopics();
        }}
      />
    );
  }

  // If there's no data and it's not currently being fetched, show the "No Content"
  // message
  if (!contentState.isFetching && _.isEmpty(contentState.items)) {
    return <NoContentMessage />;
  }

  // Filter out only items in "Currently Learning" shelf
  const inProgressContent = _.filter(
    contentState.items,
    (item) => item.shelf === "Currently Learning"
  );
  // Then order the filtered content by descending order of when it was last updated (latest to oldest)
  const orderedInProgressContent = _.orderBy(
    inProgressContent,
    "lastUpdated",
    "desc"
  );

  return (
    <FlatList
      data={orderedInProgressContent}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => (
        <HomeContentCard
          title={item.name}
          thumbnailUrl={
            item.bookInfo.imageLinks.thumbnail
              ? item.bookInfo.imageLinks.thumbnail
              : null
          }
          authors={item.authors}
          percentComplete={calculatePercentComplete(
            item.bookInfo.pagesRead,
            item.bookInfo.pageCount
          )}
          onPress={() => handleContentNavigation(item, navigation)}
        />
      )}
      ListHeaderComponent={<H1 style={styles.title}>In Progress</H1>}
      ListEmptyComponent={<NoCurrentlyLearningMessage />}
      onRefresh={onPullToRefresh}
      refreshing={refreshing}
      style={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: GRAY_5,
  },
  title: {
    marginTop: 20,
    marginHorizontal: 15,
  },
  noCurrentContentText: {
    fontFamily: REGULAR,
    fontSize: FS16,
    color: GRAY_2,
    marginTop: 10,
    marginHorizontal: 15,
  },
});

export default HomeScreen;
