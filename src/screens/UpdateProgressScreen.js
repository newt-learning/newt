import React, { useState, useLayoutEffect, useContext } from "react";
import {
  View,
  ScrollView,
  Platform,
  TouchableOpacity,
  Text,
  StyleSheet,
  TextInput,
  ActivityIndicator,
} from "react-native";
import _ from "lodash";
import { Button as ElementButton } from "react-native-elements";
import ActionButton from "../components/ActionButton";
import { MaterialIcons } from "@expo/vector-icons";
// Context
import { Context as ContentContext } from "../context/ContentContext";
import { Context as StatsContext } from "../context/StatsContext";
// Design
import { SEMIBOLD, REGULAR, FS16, FS12, FS18 } from "../design/typography";
import {
  OFF_BLACK,
  GRAY_5,
  GRAY_2,
  IOS_BLUE,
  RED,
  OFF_WHITE,
} from "../design/colors";

const UpdateProgressScreen = ({ navigation, route }) => {
  const { contentId, pagesRead, pageCount } = route.params;
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

  // Add the button for confirmation to the screen header: "Done" button for iOS
  // and check mark icon for Android (and pass the update functions)
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        if (Platform.OS === "ios") {
          if (isFetching) {
            return (
              <ActivityIndicator
                animating={isFetching}
                color={IOS_BLUE}
                style={{ paddingRight: 15 }}
              />
            );
          } else {
            return (
              <TouchableOpacity
                style={{ paddingRight: 15 }}
                onPress={submitUpdatedPagesRead}
              >
                <Text style={{ color: IOS_BLUE, fontSize: FS18 }}>Done</Text>
              </TouchableOpacity>
            );
          }
        } else {
          return (
            <ElementButton
              type="clear"
              loading={isFetching}
              loadingProps={{ color: OFF_BLACK }}
              icon={<MaterialIcons name="check" size={24} />}
              onPress={submitUpdatedPagesRead}
            />
          );
        }
      },
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

  const submitUpdatedPagesRead = () => {
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
  const submitFinishBook = () => {
    // Set learning update data object
    const learningUpdateData = {
      contentId,
      previousPagesRead: pagesRead,
      updatedPagesRead: pageCount,
      numPagesRead: pageCount - pagesRead,
      contentType: "book",
    };
    updateBookProgress(contentId, pageCount, false);
    updateContent(contentId, {
      shelf: "Finished Learning",
      dateCompleted: Date.now(),
    });
    createLearningUpdate(learningUpdateData);
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      scrollEnabled={false}
      keyboardShouldPersistTaps="handled"
    >
      <View style={{ flexDirection: "row" }}>
        <Text style={styles.text}>I'm on page</Text>
        <TextInput
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
      <View style={styles.buttonContainer}>
        <ActionButton
          title="I've finished the book"
          titleStyle={styles.buttonTitle}
          onPress={submitFinishBook}
        />
      </View>
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
    fontSize: FS16,
    backgroundColor: GRAY_5,
    paddingLeft: 5,
    borderBottomWidth: 1,
    borderColor: GRAY_2,
    width: 100,
    padding: 2,
    marginLeft: 10,
  },
  errorMessage: {
    fontFamily: REGULAR,
    fontSize: FS12,
    color: RED,
    marginTop: 15,
  },
  buttonContainer: {
    marginTop: 40,
    alignItems: "center",
  },
  buttonTitle: {
    fontSize: FS16,
  },
});

export default UpdateProgressScreen;
