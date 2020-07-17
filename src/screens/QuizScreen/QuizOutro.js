import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { H3 } from "../../components/shared/Headers";
import { REGULAR, FS12, FS14, FS16 } from "../../design/typography";
import { OFF_BLACK, GRAY_3, GRAY_1 } from "../../design/colors";

const QuizFooter = () => {
  return (
    <View style={styles.container}>
      <H3 style={styles.header}>Thanks for taking the quiz!</H3>
      <View>
        <Text style={styles.text}>
          Usually at this point we'll ask you to schedule another quiz. The time
          interval between quizzes as well as the questions asked in the next
          one will be based on how you did on this one. This process , called
          spaced repetition, will solidify what you're learning.
        </Text>
        <Text style={styles.text}>
          We're working on this. Until then, enjoy this picture of an adorable
          puppy:
        </Text>
      </View>
      <Image
        source={require("../../../assets/puppy.jpg")}
        style={styles.image}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    justifyContent: "center",
  },
  header: {
    textAlign: "center",
    marginBottom: 25,
  },
  text: {
    color: GRAY_1,
    fontFamily: REGULAR,
    fontSize: FS16,
    marginBottom: 10,
    textAlign: "center",
  },
  image: {
    marginTop: 15,
    height: 250,
    width: 200,
    alignSelf: "center",
  },
});

export default QuizFooter;
