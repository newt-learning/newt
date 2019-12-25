import React, { useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  Text,
  Platform,
  Modal
} from "react-native";
import { Button } from "react-native-elements";
import { Feather } from "@expo/vector-icons";
// Components
import TitleSection from "../components/Content/TitleSection";
import AddToLibrarySection from "../components/Content/AddToLibrarySection";
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
  const [showModal, setShowModal] = useState(false);

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
      <Modal
        visible={showModal}
        animationType="slide"
        presentationStyle="formSheet"
      >
        <View>
          <Text>Add to Library</Text>
          <Button title="Close" onPress={() => setShowModal(false)} />
        </View>
      </Modal>
      <View style={styles.imageContainer}>
        <Image
          style={styles.thumbnail}
          resizeMode="contain"
          source={bookThumbnail ? { uri: bookThumbnail } : null}
        />
      </View>
      <TitleSection title={title} authors={authors} />
      <AddToLibrarySection onPress={() => setShowModal(true)} />
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