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
// Components
import Description from "../components/Content/Description";
// Styling
import { FS24, FS16, FS14, SEMIBOLD, REGULAR } from "../design/typography";
import { OFF_BLACK, GRAY_1, GRAY_2, GRAY_4 } from "../design/colors";
// Helpers
import { checkThumbnailExistence } from "../helpers/imageHelpers";
import { shortenText } from "../helpers/textHelpers";

const BookScreen = ({ navigation }) => {
  // State to store whether the user wants to read more of the description
  const [showMore, setShowMore] = useState(false);

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
      <Description
        text={description}
        showMore={showMore}
        setShowMore={setShowMore}
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
  },
  mainInfo: {
    borderBottomWidth: 1,
    borderColor: GRAY_4,
    alignItems: "center",
    marginTop: 15,
    paddingHorizontal: 15,
    paddingBottom: 15
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
  text: {
    fontFamily: REGULAR,
    fontSize: FS14
  }
});

export default BookScreen;
