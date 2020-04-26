import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, FlatList, Text } from "react-native";
// Components
import SearchBar from "../components/shared/SearchBar";
import ContentListCard from "../components/ContentListCard";
// API
import { getBookInfo } from "../api/googleBooksApi";
// Styling
import { FS16, SEMIBOLD } from "../design/typography";
import { GRAY_2, OFF_WHITE } from "../design/colors";
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
    const getResults = async (searchTerm) => {
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
    <FlatList
      style={styles.container}
      data={bookResults}
      ListHeaderComponent={
        <SearchBar
          placeholderText="Search for books"
          onChange={setSearchBarText}
          value={searchBarText}
          onClear={clearBookResults}
        />
      }
      ListEmptyComponent={() => {
        // Show text saying No results only after user has searched
        return totalBookResults !== null ? (
          <Text style={styles.text}>No results found</Text>
        ) : null;
      }}
      renderItem={({ item }) => (
        <ContentListCard
          title={item.volumeInfo.title ? item.volumeInfo.title : null}
          authors={item.volumeInfo.authors ? item.volumeInfo.authors : null}
          thumbnailUrl={checkThumbnailExistence(item.volumeInfo)}
          onPress={() =>
            navigation.navigate("BookScreen", {
              bookInfo: extractRelevantBookInfo(item),
              comingFromAddBook: true,
            })
          }
        />
      )}
      keyExtractor={(book) => book.id}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: OFF_WHITE,
  },
  text: {
    marginHorizontal: 15,
    marginTop: 5,
    fontFamily: SEMIBOLD,
    fontSize: FS16,
    color: GRAY_2,
  },
});

export default AddBookScreen;
