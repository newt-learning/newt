import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  Platform,
  Alert,
} from "react-native";
// Context
import { Context as ContentContext } from "../context/ContentContext";
// Components
import TitleSection from "../components/Content/TitleSection";
import ActionSection from "../components/Content/ActionSection";
import Description from "../components/Content/Description";
import BookInformationSection from "../components/Content/BookInformationSection";
import Loader from "../components/shared/Loader";
import { OFF_WHITE } from "../design/colors";

const BookScreen = ({ navigation, route }) => {
  // State to store whether the user wants to read more of the description
  const [showMore, setShowMore] = useState(false);
  const [bookExistsInLibrary, setBookExistsinLibrary] = useState(null);
  const { state, checkIfBookExistsInLibrary, clearError } = useContext(
    ContentContext
  );

  // Get book info from params sent through navigation prop
  const passedBookInfo = route.params.bookInfo;
  const comingFromAddBookScreen = route.params?.comingFromAddBook ?? false;

  // Check if the book data passed, if coming from the 'Add Book Screen' (so
  // passedBookInfo won't have a '_id' field), is already in the user's library
  // and set state accordingly
  useEffect(() => {
    const checkBookInfo = async () => {
      if (passedBookInfo === null) return;

      console.log("should not be here... ", passedBookInfo === null);
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
          (item) => item.bookInfo.bookId === passedBookInfo.bookInfo.bookId
        )[0];
      } else {
        bookInfo = passedBookInfo;
      }
    } else {
      bookInfo = state.items.filter(
        (item) => item._id === passedBookInfo._id
      )[0];
    }
  }

  // If fetching data or the in-library-or-not check is ongoing, show Loader
  if (state.isFetching || bookExistsInLibrary === null) {
    return <Loader isLoading={state.isFetching} backgroundColor={OFF_WHITE} />;
  }

  // Alright this error handling code is absolute garbage but it works and I've
  // tried better ways but all seem to throw out weird behaviour or crash so
  // imma stick with this bec it's 4am and I've already spent 3+ hrs on this and
  // don't wanna look at it anymore. Eventually I'll re-do all the hacky
  // bookExists BS above and other hacky deviations from the normal systematic
  // way, which is probably why I've had to come up with this repetitive crap in
  // the first place.
  if (passedBookInfo === null) {
    if (state.error.source === "ADD") {
      console.log("Alerting adding error...");
      Alert.alert("Error", state.error.message, [
        {
          text: "Cancel",
          onPress: () => {
            navigation.goBack();
            clearError();
          },
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            navigation.goBack();
            clearError();
          },
          style: "default",
        },
      ]);

      return <View style={styles.container}></View>;
    }
  }

  if (state.error.source === "UPDATE") {
    console.log("passedbookinfo: ", passedBookInfo);
    console.log("Alerting updating error...");
    Alert.alert("Error", state.error.message, [
      {
        text: "Cancel",
        onPress: () => clearError(),
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => clearError(),
        style: "default",
      },
    ]);
  }

  if (bookInfo === null) {
    return <View style={styles.container}></View>;
  }

  const {
    name,
    authors,
    description,
    thumbnailUrl,
    shelf,
    dateAdded,
    dateCompleted,
  } = bookInfo;
  const {
    pageCount,
    pagesRead,
    industryIdentifiers,
    publisher,
    datePublished,
  } = bookInfo.bookInfo;

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
                  bookInfo,
                  buttonText: "Confirm",
                  showDeleteButton: true,
                  addToLibrary: false,
                })
            : () =>
                navigation.navigate("ShelfSelect", {
                  bookInfo,
                  addToLibrary: true,
                  buttonText: "Add to Library",
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
    flex: 1,
    backgroundColor: OFF_WHITE,
  },
  imageContainer: {
    paddingTop: 15,
    paddingBottom: 5,
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
      },
      android: {
        elevation: 0,
      },
    }),
  },
  thumbnail: {
    height: 180,
  },
});

export default BookScreen;
