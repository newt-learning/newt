import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList } from "react-native";
// Components
import SearchBar from "../components/SearchBar";
import AddBookCard from "../components/AddBookCard";
// API
import { getBookInfo } from "../api/googleBooksApi";

// Function to check if a thumbnail url or the image links object exists
const checkThumbnailExistence = volumeInfo => {
  if (volumeInfo.imageLinks) {
    if (volumeInfo.imageLinks.thumbnail) {
      return volumeInfo.imageLinks.thumbnail;
    } else {
      return null;
    }
  } else {
    return null;
  }
};

const AddBookScreen = () => {
  const [searchBarText, setSearchBarText] = useState("");
  const [bookResults, setBookResults] = useState([]);

  const clearBookResults = () => setBookResults([]);

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
        onClear={clearBookResults}
      />
      <FlatList
        data={bookResults}
        renderItem={({ item }) => (
          <AddBookCard
            title={item.volumeInfo.title ? item.volumeInfo.title : null}
            author={item.volumeInfo.authors ? item.volumeInfo.authors[0] : null}
            thumbnailUrl={checkThumbnailExistence(item.volumeInfo)}
          />
        )}
        keyExtractor={book => book.id}
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
