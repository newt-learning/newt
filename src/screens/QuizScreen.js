import React, { useState, useEffect } from "react";
import {
  View,
  SafeAreaView,
  StyleSheet,
  TouchableHighlight,
  Text,
  Platform,
} from "react-native";
import { Button } from "react-native-elements";
import _ from "lodash";
import { Feather } from "@expo/vector-icons";
// Components
import Loader from "../components/shared/Loader";
// API
import { useFetchQuiz } from "../api/quizzes";
// Design
import {
  OFF_WHITE,
  GRAY_1,
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
} from "../design/colors";
import { SEMIBOLD, REGULAR, FS24, FS16, FS14 } from "../design/typography";
import ActionButton from "../components/shared/ActionButton";

const OptionButton = ({
  title,
  isSelected,
  isChoiceCorrect,
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
  );
};

const QuizScreen = ({ route, navigation }) => {
  const { quizId, contentTitle } = route.params;

  const { status, data } = useFetchQuiz(quizId);
  // Quiz questions and answers
  const [quizQuestions, setQuizQuestions] = useState(null);
  // State for answer options selected by user
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [disableOptionSelection, setDisableOptionSelection] = useState(false);

  // Add the questions and answer choices to state once data is loaded
  useEffect(() => {
    if (status === "success") {
      setQuizQuestions(data.results);
    }
  }, [data, status]);

  if (status === "loading") {
    return <Loader />;
  }

  // Handle pressing an option
  const handleOptionSelection = (index, selectedOption) => {
    // Only update index if selection has not been disabled
    if (!disableOptionSelection) {
      setSelectedOptionIndex(index);
      setSelectedOption(selectedOption);
    }
  };

  // Handle checking the answer
  const handleAnswerCheck = () => {
    // Create a new array that can be modified
    let quizQuestionsAndResults = [...quizQuestions];

    // Check if the option selected is the correct answer
    const isChoiceCorrect =
      selectedOption === quizQuestionsAndResults[0].correctAnswer;

    // Add option selected and whether it's correct to question object
    quizQuestionsAndResults[0].optionChosen = selectedOption;
    quizQuestionsAndResults[0].isChoiceCorrect = isChoiceCorrect;

    // Update quiz/question progress
    setQuizQuestions(quizQuestionsAndResults);
    // Disable option selection
    setDisableOptionSelection(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={styles.quizHeader}>
          <TouchableHighlight
            onPress={() => navigation.goBack()}
            underlayColor={OFF_WHITE}
          >
            <Feather name="x" size={24} color={GRAY_2} />
          </TouchableHighlight>
          <Text style={styles.contentTitle}>{contentTitle}</Text>
          <View style={{ width: 24 }} />
        </View>
        {quizQuestions && (
          <View style={styles.quizBody}>
            <Text style={styles.question}>{quizQuestions[0].question}</Text>
            <View style={styles.optionsContainer}>
              {_.map(quizQuestions[0].options, (option, index) => {
                // Check if option is selected, which will affect styling
                const isSelected = index === selectedOptionIndex;

                // If the options is selected, check if a option has been made
                // (_.isUndefined check). If it hasn't (isChoiceCorrect property
                // won't be defined), return null. Otherwise return whether the
                // answer is correct or not.
                const isChoiceCorrect = isSelected
                  ? _.isUndefined(quizQuestions[0].isChoiceCorrect)
                    ? null
                    : quizQuestions[0].isChoiceCorrect
                  : null;

                return (
                  <OptionButton
                    title={option.option}
                    isSelected={isSelected}
                    isChoiceCorrect={isChoiceCorrect}
                    onPress={() => handleOptionSelection(index, option.option)}
                    disabled={disableOptionSelection}
                    key={option._id}
                  />
                );
              })}
            </View>
          </View>
        )}
      </View>
      <View style={styles.checkButtonContainer}>
        <ActionButton
          title="CHECK"
          buttonStyle={styles.checkButton}
          disabled={selectedOptionIndex === null}
          onPress={handleAnswerCheck}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: OFF_WHITE,
    flex: 1,
    justifyContent: "space-between",
  },
  quizHeader: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 20,
  },
  contentTitle: {
    fontFamily: REGULAR,
    fontSize: FS14,
    color: GRAY_1,
    textAlign: "center",
    width: 200,
    alignItems: "center",
  },
  quizBody: {
    flexDirection: "column",
    paddingHorizontal: 15,
  },
  question: {
    fontFamily: SEMIBOLD,
    fontSize: FS24,
    color: OFF_BLACK,
    marginBottom: 50,
  },
  optionButtonContainer: {
    marginBottom: 10,
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
  checkButtonContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  checkButton: {
    backgroundColor: NEWT_BLUE,
    borderColor: NEWT_BLUE,
  },
});

export default QuizScreen;
