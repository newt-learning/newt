import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, FlatList, Text, TouchableHighlight } from "react-native";
// Components
import SearchBar from "../components/shared/SearchBar";
import ContentListCard from "../components/ContentListCard";
import ClearButton from "../components/shared/ClearButton";
// API
import { getBookInfo } from "../api/googleBooksApi";
// Styling
import { FS16, SEMIBOLD } from "../design/typography";
import { GRAY_2, OFF_WHITE, GRAY_4 } from "../design/colors";
// Helpers
import { checkThumbnailExistence } from "../helpers/imageHelpers";
import { extractRelevantBookInfo } from "../helpers/apiHelpers";

const AddBookScreen = ({ navigation }) => {
  const [searchBarText, setSearchBarText] = useState("");
  const [bookResults, setBookResults] = useState([]);
  const [totalBookResults, setTotalBookResults] = useState(null);
  const [bookResultsError, setBookResultsError] = useState("");

  const clearBookResults = () => {
    setBookResults([]);
    setTotalBookResults(null);
    setBookResultsError("");
  };

  // Fetch books from search bar text input
  useEffect(() => {
    const getResults = async (searchTerm) => {
      try {
        const results = await getBookInfo(searchTerm);
        // If an items property exists in results object, set the items in state,
        // otherwise set an empty array
        results.items ? setBookResults(results.items) : setBookResults([]);
        setTotalBookResults(results.totalItems);
      } catch (e) {
        setBookResultsError("Sorry, there was an error searching for books.");
      }
    };

    if (searchBarText) {
      getResults(searchBarText);
    } else {
      clearBookResults();
    }
  }, [searchBarText]);

  // Function to fetch more books when the "See more books" button is pressed at
  // the bottom of the list.
  const getMoreBooks = async () => {
    try {
      // Second argument to function is the start index for the search (set as
      // the length on the current results)
      const moreBooks = await getBookInfo(searchBarText, bookResults.length);
      // Combine the new books with existing books
      if (moreBooks.items) {
        setBookResults([...bookResults, ...moreBooks.items]);
      }
    } catch (e) {
      setBookResultsError(
        "Sorry, there was an error searching for more books."
      );
    }
  };

  // Button at end of list to fetch more books
  const SeeMoreBooksListItem = () => {
    // First condition is of showing the button is if total book results are
    // greater than zero (don't show it if books aren't there for that search
    // term). Second condition is that the current shown results is less than
    // total available results (don't show it if there are no more books to show)
    if (totalBookResults > 0 && bookResults.length < totalBookResults) {
      return (
        <TouchableHighlight style={styles.seeMoreBooks}>
          <ClearButton title="See more books" onPress={getMoreBooks} />
        </TouchableHighlight>
      );
    } else {
      return null;
    }
  };

  // Component that shows either the error message if there's an error, or
  // notifies that there are no results for that particular search term (used in
  // ListEmptyComponent in Flatlist)
  const NoResultsOrError = () => {
    // If there's an error, show error message
    if (bookResultsError) {
      return <Text style={styles.text}>{bookResultsError}</Text>;
    }

    // Show text saying No results only after user has searched
    return totalBookResults !== null ? (
      <Text style={styles.text}>No results found</Text>
    ) : null;
  };

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
      ListEmptyComponent={<NoResultsOrError />}
      ListFooterComponent={<SeeMoreBooksListItem />}
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
      keyExtractor={(book) => `${book.id}-${book.etag}`}
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
  seeMoreBooks: {
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: GRAY_4,
  },
});

export default AddBookScreen;
