import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, View, ScrollView, Image, Platform } from "react-native";
import { Button } from "react-native-elements";
import { Feather } from "@expo/vector-icons";
// Context
import { Context as ContentContext } from "../context/ContentContext";
// Components
import TitleSection from "../components/Content/TitleSection";
import ActionSection from "../components/Content/ActionSection";
import Description from "../components/Content/Description";
import BookInformationSection from "../components/Content/BookInformationSection";
import Loader from "../components/Loader";
// Styling
import { FS14, REGULAR } from "../design/typography";
// Helpers
import { checkThumbnailExistence } from "../helpers/imageHelpers";
import { shortenText } from "../helpers/textHelpers";

const BookScreen = ({ navigation }) => {
  // State to store whether the user wants to read more of the description
  const [showMore, setShowMore] = useState(false);
  const [bookExistsInLibrary, setBookExistsinLibrary] = useState(null);
  const {
    state,
    addContent,
    updateContent,
    checkIfBookExistsInLibrary
  } = useContext(ContentContext);

  // Get book info from params sent through navigation prop
  const passedBookInfo = navigation.getParam("bookInfo");
  const comingFromAddBookScreen = navigation.getParam("comingFromAddBook");

  // Check if the book data passed, if coming from the 'Add Book Screen' (so
  // passedBookInfo won't have a '_id' field), is already in the user's library
  // and set state accordingly
  useEffect(() => {
    const checkBookInfo = async () => {
      if (!passedBookInfo._id) {
        const bookExists = await checkIfBookExistsInLibrary(
          passedBookInfo.bookInfo.bookId
        );

        if (bookExists) {
          setBookExistsinLibrary(true);
        } else {
          setBookExistsinLibrary(false);
        }
      } else {
        setBookExistsinLibrary(true);
      }
    };

    checkBookInfo();
  }, []);

  let bookInfo = {};

  // There must be a more elegant way of doing this, but what this is doing is
  // setting the bookInfo object with data based on whether the book exists in
  // the user's library or not. If it doesn't, then we want to show the Book screen with the
  // 'Add to Library' button (so get G Books data that's passed). If it does, then
  // show the Book screen with existing shelf (state/context data). The issue is that when coming from
  // the Add Book Screen, the data passed is Google Books data, so searching the
  // library must be done with Google Books id. If it's not (e.g. coming
  // from the My Library screen), then filter by database _id.
  if (bookExistsInLibrary !== null) {
    if (comingFromAddBookScreen) {
      if (bookExistsInLibrary) {
        bookInfo = state.items.filter(
          item => item.bookInfo.bookId === passedBookInfo.bookInfo.bookId
        )[0];
      } else {
        bookInfo = passedBookInfo;
      }
    } else {
      bookInfo = state.items.filter(item => item._id === passedBookInfo._id)[0];
    }
  }

  // If fetching data or the in-library-or-not check is ongoing, show Loader
  if (state.isFetching || bookExistsInLibrary === null) {
    return <Loader isLoading={state.isFetching} />;
  }

  const {
    name,
    authors,
    description,
    thumbnailUrl,
    shelf,
    dateAdded,
    dateCompleted
  } = bookInfo;
  const {
    pageCount,
    pagesRead,
    industryIdentifiers,
    publisher,
    datePublished
  } = bookInfo.bookInfo;

  const addBookToLibrary = selectedShelf => {
    const data = { ...bookInfo, shelf: selectedShelf, type: "book" };
    addContent(data);
  };
  const updateShelf = selectedShelf => {
    // If the selected shelf is "Finished Learning", add/update the date completed
    // field as well. Otherwise only change the shelf
    if (selectedShelf === "Finished Learning") {
      updateContent(bookInfo._id, {
        shelf: selectedShelf,
        dateCompleted: Date.now()
      });
    } else {
      updateContent(bookInfo._id, { shelf: selectedShelf });
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.thumbnail}
          resizeMode="contain"
          source={thumbnailUrl ? { uri: thumbnailUrl } : null}
        />
      </View>
      <TitleSection title={name} authors={authors} />
      <ActionSection
        contentId={bookExistsInLibrary ? bookInfo._id : null}
        shelf={shelf}
        pageCount={pageCount}
        pagesRead={pagesRead}
        dateAdded={dateAdded}
        dateCompleted={dateCompleted}
        onPress={
          shelf
            ? () =>
                navigation.navigate("ShelfSelect", {
                  currentShelf: shelf,
                  buttonText: "Confirm",
                  onConfirmShelf: selectedShelf => updateShelf(selectedShelf)
                })
            : () =>
                navigation.navigate("ShelfSelect", {
                  buttonText: "Add to Library",
                  onConfirmShelf: selectedShelf =>
                    addBookToLibrary(selectedShelf)
                })
        }
      />
      <Description
        text={description}
        showMore={showMore}
        setShowMore={setShowMore}
      />
      <BookInformationSection
        pageCount={pageCount}
        publisher={publisher}
        datePublished={datePublished}
        isbns={industryIdentifiers}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  imageContainer: {
    paddingTop: 15,
    paddingBottom: 5,
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 5
      },
      android: {
        elevation: 0
      }
    })
  },
  thumbnail: {
    height: 180
  }
});

export default BookScreen;
