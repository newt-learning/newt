import React, { useState, useContext } from "react";
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
// Styling
import { FS14, REGULAR } from "../design/typography";
// Helpers
import { checkThumbnailExistence } from "../helpers/imageHelpers";
import { shortenText } from "../helpers/textHelpers";

const BookScreen = ({ navigation }) => {
  // State to store whether the user wants to read more of the description
  const [showMore, setShowMore] = useState(false);
  const { addContent } = useContext(ContentContext);

  // Get book info from params sent through navigation prop
  const bookInfo = navigation.getParam("bookInfo");
  const { name, authors, description, thumbnailUrl, shelf } = bookInfo;
  const {
    pageCount,
    industryIdentifiers,
    publisher,
    datePublished
  } = bookInfo.bookInfo;

  const addBookToLibrary = selectedShelf => {
    const data = { ...bookInfo, shelf: selectedShelf, type: "book" };
    addContent(data);
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
        shelf={shelf}
        onPress={
          shelf
            ? () =>
                navigation.navigate("ShelfSelect", {
                  currentShelf: shelf,
                  buttonText: "Confirm",
                  onConfirmShelf: selectedShelf => console.log(selectedShelf)
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
