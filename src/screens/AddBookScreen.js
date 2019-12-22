import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import SearchBar from "../components/SearchBar";
// API
import { getBookInfo } from "../api/googleBooksApi";

const AddBookScreen = () => {
  const [searchBarText, setSearchBarText] = useState("");
  const [bookResults, setBookResults] = useState([]);

  // Fetch books from search bar text input
  useEffect(() => {
    const getResults = async searchTerm => {
      const results = await getBookInfo(searchTerm);
      setBookResults(results.items);
    };

    if (searchBarText) {
      getResults(searchBarText);
    }
  }, [searchBarText]);

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
