import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import _ from "lodash";
// Components
import ActionButton from "../shared/ActionButton";
import ChangeShelfButton from "./ChangeShelfButton";
import ClearButton from "../shared/ClearButton";
import ProgressBar from "../shared/ProgressBar";
import ContentPlaylistSection from "./ContentPlaylistSection";
// Styling
import { GRAY_4, GRAY_2 } from "../../design/colors";
import { REGULAR, FS12 } from "../../design/typography";
// Helpers
import { calculatePercentComplete } from "../../helpers/screenHelpers";

// Extra user-specific info based on shelf: Progress bar if Currently Learning,
// Date added if Want to Learn, and Date finished if Finished Learning
const UserInteractionSection = ({
  type,
  shelf,
  contentId,
  pagesRead,
  pageCount,
  dateAdded,
  startFinishDates,
}) => {
  const navigation = useNavigation();

  switch (shelf) {
    // If "Currently Learning", progress bar and button to update book progress
    case "Currently Learning":
      return type === "book" ? (
        <>
          <ProgressBar
            barContainerStyle={styles.progressBar}
            percentComplete={calculatePercentComplete(pagesRead, pageCount)}
          />
          <ClearButton
            title="Update Progress"
            onPress={() =>
              navigation.navigate("UpdateProgress", {
                contentId,
                pagesRead,
                pageCount,
                startFinishDates,
              })
            }
          />
        </>
      ) : null;
    // If "Want to Learn", the date it was added to the shelf
    case "Want to Learn":
      return (
        <Text style={styles.dateInfoText}>
          Added on {moment(dateAdded).format("DD MMM, YYYY")}
        </Text>
      );
    case "Finished Learning":
      // Get the last date completed from the array of dates completed
      const latestDateCompleted = !_.isEmpty(startFinishDates)
        ? startFinishDates[startFinishDates.length - 1].dateCompleted
        : null;

      return (
        <Text style={styles.dateInfoText}>
          Completed on {moment(latestDateCompleted).format("DD MMM, YYYY")}
        </Text>
      );
    default:
      return null;
  }
};

// Section for either adding a book to My Library or viewing and changing the
// shelf it's on if it's already been saved
const ActionSection = ({
  contentId,
  type,
  shelf,
  playlists,
  pageCount,
  pagesRead,
  dateAdded,
  startFinishDates,
  onPress,
}) => {
  return (
    <View style={styles.container}>
      {shelf ? (
        <View style={styles.actionSection}>
          <ChangeShelfButton shelf={shelf} onPress={onPress} />
          <UserInteractionSection
            type={type}
            shelf={shelf}
            contentId={contentId}
            pagesRead={pagesRead}
            pageCount={pageCount}
            dateAdded={dateAdded}
            startFinishDates={startFinishDates}
          />
          <ContentPlaylistSection contentId={contentId} playlists={playlists} />
        </View>
      ) : (
        <ActionButton title="Add to Library" onPress={onPress} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: GRAY_4,
  },
  actionSection: {
    maxWidth: 300,
  },
  progressBar: {
    marginTop: 15,
  },
  dateInfoText: {
    fontFamily: REGULAR,
    fontSize: FS12,
    color: GRAY_2,
    marginTop: 8,
    textAlign: "center",
  },
});

export default ActionSection;
