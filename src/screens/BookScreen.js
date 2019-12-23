import React, { useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  Image,
  TouchableOpacity
} from "react-native";
import { Feather } from "@expo/vector-icons";
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
import { shortenText } from "../helpers/textHelpers";

const BookScreen = ({ navigation }) => {
  // State to store whether the user wants to read more of the description
  const [readMore, setReadMore] = useState(false);

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
          <Text style={styles.text}>
            {readMore ? description : shortenText(description, 400)}
          </Text>
          {readMore ? (
            <TouchableOpacity
              style={styles.seeMoreContainer}
              onPress={() => setReadMore(false)}
            >
              <Feather name="chevron-up" size={16} color={GRAY_2} />
              <Text style={styles.seeMoreText}>Show Less</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.seeMoreContainer}
              onPress={() => setReadMore(true)}
            >
              <Text style={styles.seeMoreText}>Show More</Text>
              <Feather name="chevron-down" size={16} color={GRAY_2} />
            </TouchableOpacity>
          )}
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
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderColor: GRAY_4
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
  },
  seeMoreContainer: {
    marginTop: 10,
    alignItems: "center"
  },
  seeMoreText: {
    fontSize: FS14,
    color: GRAY_2
  }
});

export default BookScreen;
