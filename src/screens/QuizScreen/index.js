import React, { useState, useEffect, useContext } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import _ from "lodash";
// Context
import { Context as ContentContext } from "../../context/ContentContext";
// Components
import Loader from "../../components/shared/Loader";
import QuizBody from "./QuizBody";
import QuizFooter from "./QuizFooter";
import QuizOutro from "./QuizOutro";
import displayErrorAlert from "../../components/shared/displayErrorAlert";
// API
import { useFetchQuiz, useUpdatePersonalQuiz } from "../../api/quizzes";
// Design
import { OFF_WHITE } from "../../design/colors";
// Helpers
import { checkIfChoiceIsCorrect } from "./helpers";

const QuizScreen = ({ route, navigation }) => {
  const { quizId, contentTitle, contentQuizInfo } = route.params;

  const { status, data, error } = useFetchQuiz(quizId);

  const [
    updatePersonalQuiz,
    { status: updateQuizStatus },
  ] = useUpdatePersonalQuiz();
  const { updateContent } = useContext(ContentContext);

  // Show either questions on screen, or the outri
  const [quizSection, setQuizSection] = useState("questions");
  // Quiz questions and answers
  const [quizQuestions, setQuizQuestions] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [numQuestions, setNumQuestions] = useState(0);
  const [isQuizComplete, setIsQuizComplete] = useState(null);
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

  // console.log(`${currentQuestion} -- `, disableOptionSelection);

  // If the quiz has been completed, disable selecting options so user can only
  // view quiz answers
  useEffect(() => {
    if (!_.isEmpty(data) && data.dateCompleted) {
      setIsQuizComplete(true);
      setDisableOptionSelection(true);
    } else {
      setIsQuizComplete(false);
    }
  }, [status, data]);

  if (status === "loading" || _.isEmpty(quizQuestions)) {
    return <Loader />;
  }

  if (error) {
    displayErrorAlert("Sorry, there was an error fetching your quiz.");
    return null;
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
    if (!data.dateCompleted) {
      setDisableOptionSelection(false);
    }
  };

  // Handle finishing the quiz
  const handleFinish = async () => {
    // If quiz is completed go to outro section, otherwise update quiz info
    // and go to outro section
    if (data.dateCompleted) {
      // Go to quiz outro
      setQuizSection("outro");
    } else {
      // Spread general quiz data + add new results
      let completedQuiz = { ...data, results: quizQuestions };
      // Set date completed to now
      completedQuiz.dateCompleted = Date.now();
      // Send request to update quiz
      const updatedQuiz = await updatePersonalQuiz({
        quizId,
        data: completedQuiz,
      });
      // Add completed data to user content's quiz info
      const updatedContentQuizInfo = [...contentQuizInfo];
      updatedContentQuizInfo[0].dateCompleted = updatedQuiz.dateCompleted;
      // Update user content with new quiz info
      updateContent(updatedQuiz.userContentId, {
        quizInfo: updatedContentQuizInfo,
      });

      // Go to quiz outro
      setQuizSection("outro");
    }
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
          isQuizComplete={isQuizComplete}
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
        onFinishLoading={updateQuizStatus === "loading"}
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
