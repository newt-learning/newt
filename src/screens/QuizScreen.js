import React from "react";
import {
  View,
  SafeAreaView,
  StyleSheet,
  TouchableHighlight,
} from "react-native";
import { Feather } from "@expo/vector-icons";
// Components
import Loader from "../components/shared/Loader";
// API
import { useFetchQuiz } from "../api/quizzes";
// Design
import { GRAY_2, GRAY_5 } from "../design/colors";

const QuizScreen = ({ route, navigation }) => {
  const { quizId } = route.params ?? null;

  const { status } = useFetchQuiz(quizId);

  if (status === "loading") {
    return <Loader />;
  }

  return (
    <SafeAreaView>
      <View style={styles.quizHeader}>
        <TouchableHighlight
          onPress={() => navigation.goBack()}
          underlayColor={GRAY_5}
        >
          <Feather name="x" size={24} color={GRAY_2} />
        </TouchableHighlight>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  quizHeader: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    flexDirection: "row",
  },
});

export default QuizScreen;
