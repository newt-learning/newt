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
// Helpers
import { checkThumbnailExistence } from "../helpers/imageHelpers";
import { extractRelevantBookInfo } from "../helpers/apiHelpers";

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
              authors={item.volumeInfo.authors ? item.volumeInfo.authors : null}
              thumbnailUrl={checkThumbnailExistence(item.volumeInfo)}
              onPress={() =>
                navigation.navigate("BookScreen", {
                  bookInfo: extractRelevantBookInfo(item)
                })
              }
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
