import React from "react";
import {
  View,
  TouchableHighlight,
  StyleSheet,
  Text,
  Image
} from "react-native";
import _ from "lodash";
// Styling
import { SEMIBOLD, REGULAR, FS16, FS14 } from "../design/typography";
import { OFF_BLACK, GRAY_2, GRAY_4, GRAY_5, OFF_WHITE } from "../design/colors";

const ContentListCard = ({ title, authors, thumbnailUrl, onPress }) => {
  return (
    <TouchableHighlight
      underlayColor={GRAY_5}
      style={styles.cardContainer}
      onPress={onPress}
    >
      <>
        <Image
          style={styles.thumbnail}
          source={
            thumbnailUrl
              ? {
                  uri: thumbnailUrl
                }
              : null
          }
        />
        <View style={styles.bookInfo}>
          {title ? <Text style={styles.title}>{title}</Text> : null}
          {!_.isEmpty(authors) ? (
            <Text style={styles.author}>by {authors.join(", ")}</Text>
          ) : null}
        </View>
      </>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    minHeight: 100,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderColor: GRAY_4,
    backgroundColor: OFF_WHITE
  },
  thumbnail: {
    height: 80,
    width: 53,
    marginRight: 15
  },
  bookInfo: {
    minHeight: 100,
    flex: 1,
    paddingVertical: 10,
    paddingRight: 15,
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

export default ContentListCard;
