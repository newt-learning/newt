import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { GRAY_5, GRAY_2 } from "../../design/colors";
import { REGULAR, FS14 } from "../../design/typography";

const ErrorMessage = ({ message }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: GRAY_5,
    paddingHorizontal: 40,
  },
  text: {
    fontFamily: REGULAR,
    fontSize: FS14,
    color: GRAY_2,
    textAlign: "center",
  },
});

export default ErrorMessage;
