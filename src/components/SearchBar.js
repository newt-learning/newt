import React from "react";
import { Platform } from "react-native";
import { StyleSheet } from "react-native";
import { SearchBar as ElementSearchBar } from "react-native-elements";
import { GRAY_5, GRAY_1, OFF_WHITE } from "../design/colors";

const SearchBar = ({ placeholderText, onChange, value, onClear }) => {
  return (
    <ElementSearchBar
      placeholder={placeholderText}
      onChangeText={onChange}
      value={value}
      onClear={onClear}
      platform={Platform.OS}
      lightTheme
      containerStyle={styles.searchBarContainerStyle}
      inputContainerStyle={styles.inputContainerStyle}
      cancelButtonProps={styles.iosCancelButton}
    />
  );
};

const styles = StyleSheet.create({
  searchBarContainerStyle: {
    backgroundColor: OFF_WHITE,
    marginTop: 5,
    marginHorizontal: 5,
    borderBottomWidth: 0,
    borderTopWidth: 0,
  },
  inputContainerStyle: {
    backgroundColor: GRAY_5,
    borderRadius: 8,
  },
  iosCancelButton: {
    color: GRAY_1,
  },
});

export default SearchBar;
