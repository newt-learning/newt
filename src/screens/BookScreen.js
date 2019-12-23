import React from "react";
import { StyleSheet, View, ScrollView, Text, Image } from "react-native";
// Styling
import {
  FS24,
  FS18,
  FS16,
  FS14,
  SEMIBOLD,
  REGULAR
} from "../design/typography";
import { OFF_BLACK, GRAY_1, GRAY_2, GRAY_4 } from "../design/colors";
// Helpers
import { checkThumbnailExistence } from "../helpers/imageHelpers";

const BookScreen = ({ navigation }) => {
  // Get book info from params sent through navigation prop
  const bookInfo = navigation.getParam("bookInfo");
  const { title, authors, description, imageLinks } = bookInfo.volumeInfo;
  const bookThumbnail = checkThumbnailExistence(bookInfo.volumeInfo);

  return (
    <ScrollView style={styles.container}>
      <Image
        style={styles.thumbnail}
        resizeMode="contain"
        source={bookThumbnail ? { uri: bookThumbnail } : null}
      />
      <View style={styles.mainInfo}>
        {title ? <Text style={styles.title}>{title}</Text> : null}
        {authors ? <Text style={styles.author}>by {authors[0]}</Text> : null}
      </View>
      {description ? (
        <View style={styles.descContainer}>
          <Text style={styles.subHeader}>Description</Text>
          <Text style={styles.text}>{description}</Text>
        </View>
      ) : null}
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
  },
  mainInfo: {
    borderBottomWidth: 1,
    borderColor: GRAY_4,
    alignItems: "center",
    marginTop: 15,
    paddingHorizontal: 15,
    paddingBottom: 10
  },
  title: {
    fontFamily: SEMIBOLD,
    fontSize: FS24,
    color: OFF_BLACK,
    textAlign: "center"
  },
  author: {
    fontFamily: REGULAR,
    fontSize: FS16,
    color: GRAY_2
  },
  descContainer: {
    paddingHorizontal: 15,
    paddingVertical: 20
  },
  subHeader: {
    fontFamily: SEMIBOLD,
    fontSize: FS18,
    color: GRAY_1,
    marginBottom: 5
  },
  text: {
    fontFamily: REGULAR,
    fontSize: FS14
  }
});

export default BookScreen;
