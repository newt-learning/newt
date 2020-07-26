import React from "react";
import { View, StyleSheet, TouchableHighlight, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import _ from "lodash";
// Components
import QuizOption from "./QuizOption";
// Design
import { OFF_WHITE, GRAY_1, GRAY_2, OFF_BLACK } from "../../design/colors";
import { SEMIBOLD, REGULAR, FS24, FS14 } from "../../design/typography";
// Helpers
import { checkIfChoiceIsCorrect } from "./helpers";

const QuizBody = ({
  contentTitle,
  quizQuestions,
  currentQuestion,
  selectedOptionIndex,
  onPressOption,
  isQuizComplete,
  disableOptionSelection,
}) => {
  const navigation = useNavigation();

  return (
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
          {_.map(
            quizQuestions[currentQuestion - 1].options,
            (option, index) => {
              // Check if option is selected, which will affect styling
              let isSelected;
              // If the quiz is completed, check against the optionChosen field.
              // Otherwise if quiz is ongoing, check against the index of option
              // that has been selected.
              if (isQuizComplete) {
                isSelected =
                  option.option ===
                  quizQuestions[currentQuestion - 1].optionChosen;
              } else {
                isSelected = index === selectedOptionIndex;
              }

              // If the options is selected, check if a check has been made
              // (_.isUndefined check). If it hasn't (isChoiceCorrect property
              // won't be defined), return null. Otherwise return whether the
              // answer is correct or not.
              let isChoiceCorrect = isSelected
                ? checkIfChoiceIsCorrect(
                    quizQuestions[currentQuestion - 1].isChoiceCorrect
                  )
                : null;

              return (
                <QuizOption
                  title={option.option}
                  isSelected={isSelected}
                  isChoiceCorrect={isChoiceCorrect}
                  optionChosen={quizQuestions[currentQuestion - 1].optionChosen}
                  correctAnswer={
                    quizQuestions[currentQuestion - 1].correctAnswer
                  }
                  explanation={option.explanation}
                  onPress={() => onPressOption(index, option.option)}
                  disabled={disableOptionSelection}
                  key={option._id}
                />
              );
            }
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
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

export default QuizBody;
