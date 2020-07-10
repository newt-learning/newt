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
} from "../design/colors";
import { SEMIBOLD, REGULAR, FS24, FS16, FS14 } from "../design/typography";

const OptionButton = ({ title, isSelected, onPress }) => {
  // Add colour to the selected option
  const buttonStyle = isSelected
    ? StyleSheet.compose([styles.optionButton, styles.selectedOptionButton])
    : styles.optionButton;

  return (
    <Button
      title={title}
      type="outline"
      onPress={onPress}
      containerStyle={styles.optionButtonContainer}
      buttonStyle={buttonStyle}
      titleStyle={styles.option}
      underlayColor={NEWT_BLUE_4}
    />
  );
};

const QuizScreen = ({ route, navigation }) => {
  const { quizId, contentTitle } = route.params;

  const { status, data } = useFetchQuiz(quizId);
  // Quiz questions and answers
  const [quizQuestions, setQuizQuestions] = useState(null);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);

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
  const handleOptionSelection = (index) => {
    setSelectedOptionIndex(index);
  };

  return (
    <SafeAreaView style={styles.container}>
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

              return (
                <OptionButton
                  title={option.option}
                  isSelected={isSelected}
                  onPress={() => handleOptionSelection(index)}
                  key={option._id}
                />
              );
            })}
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: OFF_WHITE,
    flex: 1,
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
    backgroundColor: NEWT_BLUE_4,
  },
  option: {
    fontFamily: REGULAR,
    fontSize: FS16,
    color: OFF_BLACK,
  },
});

export default QuizScreen;
