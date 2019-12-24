import React, { useState } from "react";
import { StyleSheet, ScrollView, Image } from "react-native";
import { Feather } from "@expo/vector-icons";
// Components
import TitleSection from "../components/Content/TitleSection";
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

  // Get book info from params sent through navigation prop
  const bookInfo = navigation.getParam("bookInfo");
  const {
    title,
    authors,
    description,
    imageLinks,
    pageCount,
    industryIdentifiers,
    publisher,
    publishedDate
  } = bookInfo.volumeInfo;
  const bookThumbnail = checkThumbnailExistence(bookInfo.volumeInfo);

  return (
    <ScrollView style={styles.container}>
      <Image
        style={styles.thumbnail}
        resizeMode="contain"
        source={bookThumbnail ? { uri: bookThumbnail } : null}
      />
      <TitleSection title={title} authors={authors} />
      <Description
        text={description}
        showMore={showMore}
        setShowMore={setShowMore}
      />
      <BookInformationSection
        numPages={pageCount}
        publisher={publisher}
        datePublished={publishedDate}
        isbns={industryIdentifiers}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  thumbnail: {
    height: 180,
    marginTop: 15
  }
});

export default BookScreen;
