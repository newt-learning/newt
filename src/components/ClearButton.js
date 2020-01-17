import React from "react";
import { StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import { REGULAR, FS14 } from "../design/typography";
import { BLUE } from "../design/colors";

const ClearButton = ({ title }) => {
  return (
    <Button
      title={title}
      type="clear"
      buttonStyle={styles.button}
      titleStyle={styles.buttonTitle}
    />
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 2
  },
  buttonTitle: {
    fontFamily: REGULAR,
    fontSize: FS14,
    color: BLUE
  }
});

export default ClearButton;
