import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import SearchBar from "../components/SearchBar";

const AddBookScreen = () => {
  const [searchBarText, setSearchBarText] = useState("");

  return (
    <View style={styles.container}>
      <SearchBar
        placeholderText="Search for books"
        onChange={setSearchBarText}
        value={searchBarText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default AddBookScreen;
