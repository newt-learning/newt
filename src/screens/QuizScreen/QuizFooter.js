import React from "react";
import { View, StyleSheet, Text } from "react-native";
// Components
import ActionButton from "../../components/shared/ActionButton";
// Design
import { NEWT_BLUE } from "../../design/colors";

// This shows the bottom of the quiz screen, which is a "Check" button if the
// answer has not yet been verified, or if it has, then something to indicate
// whether the answer was right/wrong, an explanation if available, and a button
// to continue the quiz
const QuizFooter = ({ isChoiceCorrect, onPressCheckButton, isDisabled }) => {
  return isChoiceCorrect === null ? (
    <View style={styles.checkButtonContainer}>
      <ActionButton
        title="CHECK"
        buttonStyle={styles.checkButton}
        disabled={isDisabled}
        onPress={onPressCheckButton}
      />
    </View>
  ) : (
    <Text>correct/wrong ui</Text>
  );
};

const styles = StyleSheet.create({
  checkButtonContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  checkButton: {
    backgroundColor: NEWT_BLUE,
    borderColor: NEWT_BLUE,
  },
});

export default QuizFooter;
