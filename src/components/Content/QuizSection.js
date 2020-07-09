import React from "react";
import { View, StyleSheet } from "react-native";
// Components
import ActionButton from "../shared/ActionButton";
// Design
import { GRAY_4 } from "../../design/colors";

const QuizSection = ({ onPress }) => {
  return (
    <View style={styles.container}>
      <ActionButton title="Take the quiz" onPress={onPress} />
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
