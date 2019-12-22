import React from "react";
import { StyleSheet } from "react-native";
import { SearchBar as ElementSearchBar } from "react-native-elements";
import { WHITE, GRAY_5 } from "../design/colors";

const SearchBar = ({ placeholderText, onChange, value }) => {
  return (
    <ElementSearchBar
      placeholder={placeholderText}
      onChangeText={onChange}
      value={value}
      lightTheme
      containerStyle={styles.searchBarContainerStyle}
      inputContainerStyle={styles.inputContainerStyle}
    />
  );
};

const styles = StyleSheet.create({
  searchBarContainerStyle: {
    backgroundColor: WHITE,
    marginTop: 5,
    marginHorizontal: 5,
    borderBottomWidth: 0,
    borderTopWidth: 0
  },
  inputContainerStyle: {
    backgroundColor: GRAY_5,
    borderRadius: 8
  }
});

export default SearchBar;
