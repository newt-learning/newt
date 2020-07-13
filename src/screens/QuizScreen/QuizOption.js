import React from "react";
import { View, StyleSheet, Platform, Text } from "react-native";
// Components
import { Button } from "react-native-elements";
// Design
import {
  OFF_WHITE,
  GRAY_2,
  GRAY_4,
  OFF_BLACK,
  NEWT_BLUE,
  NEWT_BLUE_4,
  NEWT_BLUE_5,
  NEWT_BLUE_DARK,
  RED,
  RED_5,
  LIME_GREEN,
  LIME_GREEN_5,
  LIME_GREEN_DARK,
} from "../../design/colors";
import { SEMIBOLD, REGULAR, FS16, FS12 } from "../../design/typography";

const QuizOption = ({
  title,
  isSelected,
  isChoiceCorrect,
  optionChosen,
  explanation,
  onPress,
  disabled,
}) => {
  // Add colour to the selected option
  const buttonStyle = StyleSheet.compose([
    // Default button style
    styles.optionButton,
    // If selected, show selected button styling (blue colour)
    isSelected && styles.selectedOptionButton,
    // If the choice is correct, show green styling
    isChoiceCorrect && styles.correctOption,
    // If choice is wrong, show red styling
    isChoiceCorrect === false && styles.wrongOption,
  ]);

  const titleStyle = StyleSheet.compose([
    // Default text style
    styles.optionText,
    // If selected, make text blue
    isSelected && styles.selectedOptionText,
    // If correct, make text green
    isChoiceCorrect && styles.correctOptionText,
    // If wrong, make text red
    isChoiceCorrect === false && styles.wrongOptionText,
  ]);

  return (
    <View style={styles.container}>
      <Button
        title={title}
        type="outline"
        onPress={onPress}
        containerStyle={styles.optionButtonContainer}
        buttonStyle={buttonStyle}
        titleStyle={titleStyle}
        underlayColor={NEWT_BLUE_4}
        disabled={disabled}
        disabledStyle={buttonStyle}
        disabledTitleStyle={titleStyle}
      />
      {/* Display the answer explanation if an option has been chosen and
        an explanation exists */}
      {optionChosen && explanation && (
        <Text style={styles.explanation}>{explanation}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  optionButtonContainer: {
    marginBottom: 5,
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
      },
      android: {
        elevation: 0,
      },
    }),
  },
  optionButton: {
    backgroundColor: OFF_WHITE,
    borderBottomWidth: 2,
    borderRadius: 12,
    borderColor: GRAY_4,
  },
  selectedOptionButton: {
    borderColor: NEWT_BLUE,
    backgroundColor: NEWT_BLUE_5,
  },
  correctOption: {
    borderColor: LIME_GREEN,
    backgroundColor: LIME_GREEN_5,
  },
  wrongOption: {
    borderColor: RED,
    backgroundColor: RED_5,
  },
  optionText: {
    fontFamily: REGULAR,
    fontSize: FS16,
    color: OFF_BLACK,
  },
  selectedOptionText: {
    color: NEWT_BLUE_DARK,
  },
  correctOptionText: {
    fontFamily: SEMIBOLD,
    color: LIME_GREEN_DARK,
  },
  wrongOptionText: {
    fontFamily: SEMIBOLD,
    color: RED,
  },
  explanation: {
    paddingHorizontal: 10,
    fontSize: FS12,
    color: GRAY_2,
  },
});

export default QuizOption;
