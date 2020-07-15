import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import _ from "lodash";
// Components
import Loader from "../../components/shared/Loader";
import QuizBody from "./QuizBody";
import QuizFooter from "./QuizFooter";
import QuizOutro from "./QuizOutro";
// API
import { useFetchQuiz, useUpdatePersonalQuiz } from "../../api/quizzes";
// Design
import { OFF_WHITE } from "../../design/colors";
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
        <QuizBody
          contentTitle={contentTitle}
          quizQuestions={quizQuestions}
          currentQuestion={currentQuestion}
          selectedOptionIndex={selectedOptionIndex}
          onPressOption={handleOptionSelection}
          disableOptionSelection={disableOptionSelection}
        />
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
});

export default QuizScreen;
