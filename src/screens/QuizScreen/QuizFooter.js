import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { useSafeArea } from "react-native-safe-area-context";
// Components
import ActionButton from "../../components/shared/ActionButton";
// Design
import {
  NEWT_BLUE,
  LIME_GREEN_DARK,
  LIME_GREEN_5,
  RED,
  RED_5,
  GRAY_3,
} from "../../design/colors";
import { BOLD, FS20 } from "../../design/typography";

const AnswerFeedback = ({
  isChoiceCorrect,
  isQuizFinished,
  onPressNext,
  onFinish,
  onFinishLoading,
}) => {
  const insets = useSafeArea();
  const BOTTOM_PADDING = insets.bottom + 20;

  const containerStyle = StyleSheet.compose([
    styles.answerFeedbackContainer,
    { paddingBottom: BOTTOM_PADDING },
    isChoiceCorrect
      ? styles.correctChoiceBackground
      : styles.wrongChoiceBackground,
  ]);
  const nextButtonStyle = isChoiceCorrect
    ? styles.correctChoiceButton
    : styles.wrongChoiceButton;

  return (
    <View style={containerStyle}>
      <Text
        style={[
          styles.answerFeedback,
          isChoiceCorrect ? { color: LIME_GREEN_DARK } : { color: RED },
        ]}
      >
        {isChoiceCorrect ? "Excellent!" : "Incorrect choice"}
      </Text>
      <View style={{ alignItems: "center" }}>
        {isQuizFinished ? (
          <ActionButton
            title="FINISH"
            onPress={onFinish}
            buttonContainerStyle={{ alignItems: "center" }}
            buttonStyle={nextButtonStyle}
            showLoading={onFinishLoading}
          />
        ) : (
          <ActionButton
            title="NEXT"
            onPress={onPressNext}
            buttonContainerStyle={{ alignItems: "center" }}
            buttonStyle={nextButtonStyle}
          />
        )}
      </View>
    </View>
  );
};

// This shows the bottom of the quiz screen, which is a "Check" button if the
// answer has not yet been verified, or if it has, then something to indicate
// whether the answer was right/wrong, an explanation if available, and a button
// to continue the quiz
const QuizFooter = ({
  quizSection,
  isChoiceCorrect,
  onPressCheckButton,
  onPressNextButton,
  onFinish,
  onFinishLoading,
  onClose,
  isQuizFinished,
  isDisabled,
}) => {
  const insets = useSafeArea();
  const BOTTOM_MARGIN = insets.bottom + 20;

  // If the user is in the Outro section, show a close button. Otherwise they're
  // in the questions section. In that case, if an answer hasn't been selected,
  // show the Check button, otherwise provide Answer feedback.
  if (quizSection === "outro") {
    return (
      <View
        style={[styles.checkButtonContainer, { marginBottom: BOTTOM_MARGIN }]}
      >
        <ActionButton
          title="CLOSE"
          buttonStyle={styles.closeButton}
          onPress={onClose}
        />
      </View>
    );
  } else {
    if (isChoiceCorrect === null) {
      return (
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
      );
    } else {
      return (
        <AnswerFeedback
          isChoiceCorrect={isChoiceCorrect}
          isQuizFinished={isQuizFinished}
          onPressNext={onPressNextButton}
          onFinish={onFinish}
          onFinishLoading={onFinishLoading}
          onClose={onClose}
        />
      );
    }
  }
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
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 15,
    paddingTop: 15,
  },
  correctChoiceBackground: {
    backgroundColor: LIME_GREEN_5,
  },
  wrongChoiceBackground: {
    backgroundColor: RED_5,
  },
  answerFeedback: {
    fontFamily: BOLD,
    fontSize: FS20,
    marginBottom: 15,
  },
  correctChoiceButton: {
    backgroundColor: LIME_GREEN_DARK,
  },
  wrongChoiceButton: {
    backgroundColor: RED,
  },
  closeButton: {
    backgroundColor: GRAY_3,
  },
});

export default QuizFooter;
