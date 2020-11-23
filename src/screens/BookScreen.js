import React, { useState, useEffect, useLayoutEffect, useContext } from "react";
import { StyleSheet, View, ScrollView, Image, Platform } from "react-native";
import _ from "lodash";
// Context
import { Context as ContentContext } from "../context/ContentContext";
// Components
import TitleSection from "../components/Content/TitleSection";
import ActionSection from "../components/Content/ActionSection";
import Description from "../components/Content/Description";
import BookInformationSection from "../components/Content/BookInformationSection";
import Loader from "../components/shared/Loader";
import MoreOptionsButton from "../components/shared/MoreOptionsButton";
import OptionsModal from "../components/shared/OptionsModal";
// Design
import { OFF_WHITE } from "../design/colors";
// Utilities
import { updateToV2ContentSchema } from "../utils/schemaUpdates";

const BookScreen = ({ navigation, route }) => {
  // State to store whether the user wants to read more of the description
  const [showMore, setShowMore] = useState(false);
  const [bookExistsInLibrary, setBookExistsinLibrary] = useState(null);
  // Initialize modal visibility
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Get book info from params sent through navigation prop
  const passedBookInfo = route.params.bookInfo;
  const comingFromAddBookScreen = route.params?.comingFromAddBook ?? false;

  // Add the 3-dot options icon which opens the options modal, only shown in
  // My Library screen (not when adding a book)
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () =>
        comingFromAddBookScreen ? null : (
          <MoreOptionsButton onPress={() => setIsModalVisible(true)} />
        ),
    });
  });

  const { state, checkIfBookExistsInLibrary, updateContent } = useContext(
    ContentContext
  );

  // Check if the book data passed, if coming from the 'Add Book Screen' (so
  // passedBookInfo won't have a '_id' field), is already in the user's library
  // and set state accordingly
  useEffect(() => {
    const checkBookInfo = async () => {
      if (passedBookInfo === null) return;

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
  }, [passedBookInfo]);

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

  // This effect hook updates the schema to version 2 if it needs to, so that
  // the add/edit reading dates feature is available
  useEffect(() => {
    updateToV2ContentSchema(bookInfo, bookExistsInLibrary, updateContent);
  }, [bookInfo, bookExistsInLibrary]);

  // If fetching data or the in-library-or-not check is ongoing, show Loader
  if (state.isFetching || bookExistsInLibrary === null) {
    return <Loader isLoading={state.isFetching} backgroundColor={OFF_WHITE} />;
  }

  if (bookInfo === null) {
    return <View style={styles.container}></View>;
  }

  // List of buttons in the options modal
  const modalOptions = [
    {
      title: "Add or Edit Dates Read",
      onPress: () => {
        setIsModalVisible(false);
        navigation.navigate("AddEditDates", {
          contentId: bookInfo._id,
          contentType: bookInfo.type,
          startFinishDates: JSON.stringify(bookInfo.startFinishDates),
        });
      },
    },
  ];

  const {
    name,
    authors,
    description,
    thumbnailUrl,
    type,
    shelf,
    playlists,
    dateAdded,
    startFinishDates,
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
        type={type}
        shelf={shelf}
        playlists={playlists}
        pageCount={pageCount}
        pagesRead={pagesRead}
        dateAdded={dateAdded}
        startFinishDates={startFinishDates}
        onPress={
          shelf
            ? () =>
                navigation.navigate("ShelfSelect", {
                  contentInfo: bookInfo,
                  buttonText: "Confirm",
                  addToLibrary: false,
                })
            : () =>
                navigation.navigate("ShelfSelect", {
                  contentInfo: bookInfo,
                  buttonText: "Add to Library",
                  addToLibrary: true,
                  contentType: "book",
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
      <OptionsModal
        isVisible={isModalVisible}
        onBackdropPress={() => setIsModalVisible(false)}
        options={modalOptions}
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
