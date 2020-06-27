import React, { useState, useLayoutEffect, useContext } from "react";
import { View, ScrollView, Text, StyleSheet } from "react-native";
import _ from "lodash";
// API
import { useAddContentToChallenge } from "../api/challenges";
// Components
import ModalConfirmationButton from "../components/shared/ModalConfirmationButton";
import ClearButton from "../components/shared/ClearButton";
import BoxTextInput from "../components/shared/BoxTextInput";
// Context
import { Context as ContentContext } from "../context/ContentContext";
import { Context as StatsContext } from "../context/StatsContext";
// Design
import { SEMIBOLD, REGULAR, FS16, FS12 } from "../design/typography";
import { RED, OFF_WHITE } from "../design/colors";

const UpdateProgressScreen = ({ navigation, route }) => {
  const { contentId, pagesRead, pageCount, startFinishDates } = route.params;
  const [updatedPagesRead, setUpdatedPagesRead] = useState(`${pagesRead}`);
  const [errorMessage, setErrorMessage] = useState(null);
  // Get state + functions from Content Context
  const {
    state: { isFetching },
    updateBookProgress,
    updateContent,
  } = useContext(ContentContext);
  // Get function from Stats Context
  const { createLearningUpdate } = useContext(StatsContext);
  // Get function to add content to an existing challenge (used when "Finished
  // book" button is pressed)
  const [addContentToChallenge] = useAddContentToChallenge();

  // Add the button for confirmation to the screen header: "Done" button for iOS
  // and check mark icon for Android (and pass the update functions)
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <ModalConfirmationButton
          isFetching={isFetching}
          onSubmit={submitUpdatedPagesRead}
        />
      ),
    });
  });

  // Validation function that's run before submitting request to check whether
  // the number inputted makes sense.
  const validatePagesRead = () => {
    const num = _.toNumber(updatedPagesRead);
    const emDash = String.fromCharCode(8212);

    if (!_.isNumber(num)) {
      setErrorMessage("Your input needs to be a number.");
      return false;
    }
    if (_.isNumber(num) && !_.isInteger(num)) {
      setErrorMessage("The number of pages read needs to be an integer.");
      return false;
    }
    if (num < 0) {
      setErrorMessage(
        "Not sure how you've managed to read negative pages. The number needs to be positive."
      );
      return false;
    }
    if (num > pageCount) {
      setErrorMessage(
        `The number of pages you've read can't be more than the total number of pages in the book ${emDash} obviously.`
      );
      return false;
    }

    setErrorMessage(null);
    return true;
  };

  const submitUpdatedPagesRead = async () => {
    const isValid = validatePagesRead();
    if (isValid) {
      // Set learning update data object
      const learningUpdateData = {
        contentId,
        previousPagesRead: pagesRead,
        updatedPagesRead,
        numPagesRead: updatedPagesRead - pagesRead,
        contentType: "book",
      };
      updateBookProgress(contentId, _.toNumber(updatedPagesRead));
      createLearningUpdate(learningUpdateData);
      navigation.goBack();
    }
  };

  // Function that updates pages read to page count and changes shelf to
  // "Finished Learning" when finished book button is pressed
  const submitFinishBook = async () => {
    // Set learning update data object
    const learningUpdateData = {
      contentId,
      previousPagesRead: pagesRead,
      updatedPagesRead: pageCount,
      numPagesRead: pageCount - pagesRead,
      contentType: "book",
    };
    // Set the last readings session's dateCompleted as now
    let updatedStartFinishDates = [...startFinishDates];
    updatedStartFinishDates[
      updatedStartFinishDates.length - 1
    ].dateCompleted = Date.now();

    updateBookProgress(contentId, pageCount, false);
    updateContent(contentId, {
      shelf: "Finished Learning",
      startFinishDates: updatedStartFinishDates,
    });
    createLearningUpdate(learningUpdateData);
    // Update reading challenge
    addContentToChallenge(contentId);

    navigation.goBack();
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      scrollEnabled={false}
      keyboardShouldPersistTaps="handled"
    >
      <View style={{ flexDirection: "row" }}>
        <Text style={styles.text}>I'm on page</Text>
        <BoxTextInput
          style={styles.input}
          value={updatedPagesRead}
          onFocus={() => setUpdatedPagesRead(null)}
          onChangeText={setUpdatedPagesRead}
          keyboardType="number-pad"
          maxLength={8}
        />
      </View>
      {errorMessage ? (
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      ) : null}
      <ClearButton
        title="I've finished the book"
        titleStyle={styles.buttonTitle}
        containerStyle={styles.buttonContainer}
        buttonStyle={{ paddingLeft: 0 }}
        onPress={submitFinishBook}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 15,
    backgroundColor: OFF_WHITE,
  },
  text: {
    textAlignVertical: "center",
    fontFamily: SEMIBOLD,
    fontSize: FS16,
  },
  input: {
    marginLeft: 10,
  },
  errorMessage: {
    fontFamily: REGULAR,
    fontSize: FS12,
    color: RED,
    marginTop: 15,
  },
  buttonContainer: {
    marginTop: 50,
    alignItems: "flex-start",
  },
  buttonTitle: {
    fontSize: FS16,
  },
});

export default UpdateProgressScreen;
