import React from "react";
import { TextInput, StyleSheet } from "react-native";
import { REGULAR, FS16 } from "../../design/typography";
import { GRAY_2, GRAY_5 } from "../../design/colors";

const BoxTextInput = ({ value, onChangeText, style, ...inputProps }) => {
  return (
    <TextInput
      style={StyleSheet.compose(styles.input, style)}
      value={value}
      onChangeText={onChangeText}
      {...inputProps}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    fontFamily: REGULAR,
    fontSize: FS16,
    padding: 2,
    paddingLeft: 5,
    borderBottomWidth: 1,
    borderColor: GRAY_2,
    width: 100,
    backgroundColor: GRAY_5,
  },
});

export default BoxTextInput;
