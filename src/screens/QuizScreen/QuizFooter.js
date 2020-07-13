import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { useSafeArea } from "react-native-safe-area-context";
// Components
import ActionButton from "../../components/shared/ActionButton";
// Design
import { NEWT_BLUE, RED_5, LIME_GREEN_5 } from "../../design/colors";

const AnswerFeedback = ({ isChoiceCorrect }) => {
  const containerStyle = StyleSheet.compose([
    styles.answerFeedbackContainer,
    isChoiceCorrect ? styles.correctChoice : styles.wrongChoice,
  ]);

  return <View style={containerStyle}></View>;
};

// This shows the bottom of the quiz screen, which is a "Check" button if the
// answer has not yet been verified, or if it has, then something to indicate
// whether the answer was right/wrong, an explanation if available, and a button
// to continue the quiz
const QuizFooter = ({ isChoiceCorrect, onPressCheckButton, isDisabled }) => {
  const insets = useSafeArea();
  const BOTTOM_MARGIN = insets.bottom + 20;

  return isChoiceCorrect === null ? (
    <View
      style={[styles.checkButtonContainer, { marginBottom: BOTTOM_MARGIN }]}
    >
      <ActionButton
        title="CHECK"
        buttonStyle={styles.checkButton}
        disabled={isDisabled}
        onPress={onPressCheckButton}
      />
    </View>
  ) : (
    <AnswerFeedback isChoiceCorrect={isChoiceCorrect} />
  );
};

const styles = StyleSheet.create({
  checkButtonContainer: {
    alignItems: "center",
  },
  checkButton: {
    backgroundColor: NEWT_BLUE,
    borderColor: NEWT_BLUE,
  },
  answerFeedbackContainer: {
    height: 175,
  },
  correctChoice: {
    backgroundColor: LIME_GREEN_5,
  },
  wrongChoice: {
    backgroundColor: RED_5,
  },
});

export default QuizFooter;
