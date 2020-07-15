import React, { useState, useEffect } from "react";
import { View, StyleSheet, TouchableHighlight, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import _ from "lodash";
import { Feather } from "@expo/vector-icons";
// Components
import Loader from "../../components/shared/Loader";
import QuizOption from "./QuizOption";
import QuizFooter from "./QuizFooter";
import QuizOutro from "./QuizOutro";
// API
import { useFetchQuiz, useUpdatePersonalQuiz } from "../../api/quizzes";
// Design
import { OFF_WHITE, GRAY_1, GRAY_2, OFF_BLACK } from "../../design/colors";
import { SEMIBOLD, REGULAR, FS24, FS14 } from "../../design/typography";
// Helpers
import { checkIfChoiceIsCorrect } from "./helpers";

const QuizScreen = ({ route, navigation }) => {
  const { quizId, contentTitle } = route.params;

  const { status, data } = useFetchQuiz(quizId);
  const [updatePersonalQuiz] = useUpdatePersonalQuiz();

  // Show either questions on screen, or the outri
  const [quizSection, setQuizSection] = useState("questions");
  // Quiz questions and answers
  const [quizQuestions, setQuizQuestions] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [numQuestions, setNumQuestions] = useState(0);
  // State for answer options selected by user
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [disableOptionSelection, setDisableOptionSelection] = useState(false);

  // Add the questions and answer choices to state once data is loaded
  useEffect(() => {
    if (status === "success") {
      setQuizQuestions(data.results);
      setNumQuestions(data.results.length);
    }
  }, [data, status]);

  if (status === "loading" || _.isEmpty(quizQuestions)) {
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
      selectedOption ===
      quizQuestionsAndResults[currentQuestion - 1].correctAnswer;

    // Add option selected and whether it's correct to question object
    quizQuestionsAndResults[currentQuestion - 1].optionChosen = selectedOption;
    quizQuestionsAndResults[
      currentQuestion - 1
    ].isChoiceCorrect = isChoiceCorrect;

    // Update quiz/question progress
    setQuizQuestions(quizQuestionsAndResults);
    // Disable option selection
    setDisableOptionSelection(true);
  };

  // Handle going to the next question. Increment current question by 1, and
  // reset other question-related state to defaults
  const handleGoNext = () => {
    setCurrentQuestion(currentQuestion + 1);
    setSelectedOptionIndex(null);
    setSelectedOption(null);
    setDisableOptionSelection(false);
  };

  // Handle finishing the quiz
  const handleFinish = () => {
    // Spread general quiz data + add new results
    let completedQuiz = { ...data, results: quizQuestions };
    // Set date completed to now
    completedQuiz.dateCompleted = Date.now();
    // Send request to update quiz
    updatePersonalQuiz({ quizId, data: completedQuiz });
    // Go to quiz outro
    setQuizSection("outro");
  };

  return (
    <SafeAreaView style={styles.container}>
      {quizSection === "questions" ? (
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
              <Text style={styles.question}>
                {quizQuestions[currentQuestion - 1].question}
              </Text>
              <View style={styles.optionsContainer}>
                {_.map(
                  quizQuestions[currentQuestion - 1].options,
                  (option, index) => {
                    // Check if option is selected, which will affect styling
                    const isSelected = index === selectedOptionIndex;

                    // If the options is selected, check if a check has been made
                    // (_.isUndefined check). If it hasn't (isChoiceCorrect property
                    // won't be defined), return null. Otherwise return whether the
                    // answer is correct or not.
                    const isChoiceCorrect = isSelected
                      ? checkIfChoiceIsCorrect(
                          quizQuestions[currentQuestion - 1].isChoiceCorrect
                        )
                      : null;

                    return (
                      <QuizOption
                        title={option.option}
                        isSelected={isSelected}
                        isChoiceCorrect={isChoiceCorrect}
                        optionChosen={
                          quizQuestions[currentQuestion - 1].optionChosen
                        }
                        correctAnswer={
                          quizQuestions[currentQuestion - 1].correctAnswer
                        }
                        explanation={option.explanation}
                        onPress={() =>
                          handleOptionSelection(index, option.option)
                        }
                        disabled={disableOptionSelection}
                        key={option._id}
                      />
                    );
                  }
                )}
              </View>
            </View>
          )}
        </View>
      ) : (
        <QuizOutro />
      )}

      <QuizFooter
        quizSection={quizSection}
        isChoiceCorrect={checkIfChoiceIsCorrect(
          quizQuestions[currentQuestion - 1].isChoiceCorrect
        )}
        onPressCheckButton={handleAnswerCheck}
        onPressNextButton={handleGoNext}
        onFinish={handleFinish}
        onClose={() => navigation.goBack()}
        isQuizFinished={currentQuestion === numQuestions}
        isDisabled={selectedOptionIndex === null}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: OFF_WHITE,
    flex: 1,
    justifyContent: "space-between",
    paddingBottom: 0,
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
});

export default QuizScreen;
