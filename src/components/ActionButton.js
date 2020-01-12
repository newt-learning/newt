import React from "react";
import { StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import { INDIGO } from "../design/colors";
import { SEMIBOLD } from "../design/typography";

const ActionButton = ({ title, onPress, showLoading }) => (
  <Button
    title={title}
    buttonStyle={styles.button}
    titleStyle={styles.buttonTitle}
    loading={showLoading}
    onPress={onPress}
    raised
  />
);

const styles = StyleSheet.create({
  button: {
    width: 300,
    minHeight: 45, // Should be a better way to make sure button size doesn't change when loading indicator is showing
    backgroundColor: INDIGO,
    borderRadius: 5
  },
  buttonTitle: {
    fontFamily: SEMIBOLD
  }
});

export default ActionButton;
