import React from "react";
import { TouchableOpacity, StyleSheet, Text } from "react-native";
// Styling
import { FS18, SEMIBOLD } from "../design/typography";

const ContentButton = ({
  text,
  onPress,
  buttonStyle: passedButtonStyle,
  textStyle: passedTextStyle
}) => {
  // Combine default styles and custom styles passed as props
  const buttonStyle = StyleSheet.flatten([styles.container, passedButtonStyle]);
  const textStyle = StyleSheet.flatten([styles.text, passedTextStyle]);

  return (
    <TouchableOpacity style={buttonStyle} onPress={onPress}>
      <Text style={textStyle}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
    borderRadius: 8,
    alignItems: "center"
  },
  text: {
    fontFamily: SEMIBOLD,
    fontSize: FS18
  }
});

export default ContentButton;
