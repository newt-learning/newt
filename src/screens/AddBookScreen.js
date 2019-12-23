import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList, Text } from "react-native";
// Components
import SearchBar from "../components/SearchBar";
import AddBookCard from "../components/AddBookCard";
// API
import { getBookInfo } from "../api/googleBooksApi";
// Styling
import { FS16, SEMIBOLD } from "../design/typography";
import { GRAY_2 } from "../design/colors";

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

const AddBookScreen = ({ navigation }) => {
  const [searchBarText, setSearchBarText] = useState("");
  const [bookResults, setBookResults] = useState([]);
  const [totalBookResults, setTotalBookResults] = useState(null);

  const clearBookResults = () => {
    setBookResults([]);
    setTotalBookResults(null);
  };

  // Fetch books from search bar text input
  useEffect(() => {
    const getResults = async searchTerm => {
      const results = await getBookInfo(searchTerm);
      setBookResults(results.items);
      setTotalBookResults(results.totalItems);
    };

    if (searchBarText) {
      getResults(searchBarText);
    } else {
      clearBookResults();
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
      {totalBookResults === 0 ? (
        <Text style={styles.text}>No results found</Text>
      ) : (
        <FlatList
          data={bookResults}
          renderItem={({ item }) => (
            <AddBookCard
              title={item.volumeInfo.title ? item.volumeInfo.title : null}
              author={
                item.volumeInfo.authors ? item.volumeInfo.authors[0] : null
              }
              thumbnailUrl={checkThumbnailExistence(item.volumeInfo)}
              onPress={() => navigation.navigate("BookScreen")}
            />
          )}
          keyExtractor={book => book.id}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  text: {
    marginHorizontal: 15,
    marginTop: 5,
    fontFamily: SEMIBOLD,
    fontSize: FS16,
    color: GRAY_2
  }
});

export default AddBookScreen;
