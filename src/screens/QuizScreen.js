import React from "react";
import {
  View,
  SafeAreaView,
  StyleSheet,
  TouchableHighlight,
  Text,
} from "react-native";
import { Feather } from "@expo/vector-icons";
// Components
import Loader from "../components/shared/Loader";
// API
import { useFetchQuiz } from "../api/quizzes";
// Design
import { GRAY_1, GRAY_2, GRAY_5 } from "../design/colors";
import { REGULAR, FS14 } from "../design/typography";

const QuizScreen = ({ route, navigation }) => {
  const { quizId, contentTitle } = route.params;

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
        <Text style={styles.contentTitle}>{contentTitle}</Text>
        <View style={{ width: 24 }} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  quizHeader: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  contentTitle: {
    fontFamily: REGULAR,
    fontSize: FS14,
    color: GRAY_1,
    textAlign: "center",
    width: 200,
    alignItems: "center",
  },
});

export default QuizScreen;
