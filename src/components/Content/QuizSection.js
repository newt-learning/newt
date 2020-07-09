import React from "react";
import { View, StyleSheet } from "react-native";
import _ from "lodash";
// Components
import ActionButton from "../shared/ActionButton";
// Design
import { GRAY_4 } from "../../design/colors";

const QuizSection = ({ quizInfo, isLoading, onPress }) => {
  return (
    <View style={styles.container}>
      <ActionButton
        title={_.isEmpty(quizInfo) ? "Take the quiz" : "See quiz results"}
        onPress={onPress}
        showLoading={isLoading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: GRAY_4,
  },
});

export default QuizSection;
