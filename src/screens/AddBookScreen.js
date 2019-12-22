import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
// Components
import SearchBar from "../components/SearchBar";
import AddBookCard from "../components/AddBookCard";
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
      <AddBookCard
        title="Educated"
        author="Tara Westover"
        thumbnailUrl="http://books.google.com/books/content?id=2ObWDgAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl"
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
