import React from "react";
import { View, Text, StyleSheet } from "react-native";
import ClearButton from "./ClearButton";
import { GRAY_5, GRAY_2 } from "../../design/colors";
import { REGULAR, FS14, FS16 } from "../../design/typography";

const ErrorMessage = ({ message, onRetry, backgroundColor = GRAY_5 }) => {
  const containerStyle = StyleSheet.compose(styles.container, {
    backgroundColor,
  });

  return (
    <View style={containerStyle}>
      <Text style={styles.text}>{message}</Text>
      <ClearButton
        title="Retry"
        onPress={onRetry}
        containerStyle={styles.buttonContainer}
        titleStyle={styles.buttonTitle}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  text: {
    fontFamily: REGULAR,
    fontSize: FS14,
    color: GRAY_2,
    textAlign: "center",
  },
  buttonContainer: {
    marginTop: 15,
  },
  buttonTitle: {
    fontSize: FS16,
  },
});

export default ErrorMessage;
