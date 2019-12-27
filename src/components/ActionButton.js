import React from "react";
import { StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import { INDIGO } from "../design/colors";
import { SEMIBOLD } from "../design/typography";

const ActionButton = ({ title, onPress }) => (
  <Button
    title={title}
    buttonStyle={styles.button}
    titleStyle={styles.buttonTitle}
    onPress={onPress}
    raised
  />
);

const styles = StyleSheet.create({
  button: {
    width: 300,
    backgroundColor: INDIGO,
    borderRadius: 5
  },
  buttonTitle: {
    fontFamily: SEMIBOLD
  }
});

export default ActionButton;
