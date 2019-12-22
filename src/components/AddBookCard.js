import React from "react";
import {
  View,
  TouchableHighlight,
  StyleSheet,
  Text,
  Image
} from "react-native";
// Styling
import { SEMIBOLD, REGULAR, FS16, FS14 } from "../design/typography";
import { GRAY_5, GRAY_2, OFF_BLACK } from "../design/colors";

const AddBookCard = ({ title, author, thumbnailUrl }) => {
  return (
    <TouchableHighlight
      underlayColor={GRAY_5}
      style={styles.cardContainer}
      onPress={() => console.log("add book")}
    >
      <>
        <Image
          style={styles.thumbnail}
          source={{
            uri: thumbnailUrl
          }}
        />
        <View style={styles.bookInfo}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.author}>by {author}</Text>
        </View>
      </>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    height: 100,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 15,
    borderBottomWidth: 1,
    borderColor: GRAY_5
  },
  thumbnail: {
    height: 80,
    width: 53,
    marginRight: 15
  },
  bookInfo: {
    height: 100,
    paddingVertical: 10,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "stretch"
  },
  title: {
    fontFamily: SEMIBOLD,
    fontSize: FS16,
    color: OFF_BLACK,
    marginBottom: 3
  },
  author: {
    fontFamily: REGULAR,
    fontSize: FS14,
    color: GRAY_2
  }
});

export default AddBookCard;
