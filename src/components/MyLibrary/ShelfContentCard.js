import React from "react";
import { TouchableHighlight, Image, Text, StyleSheet } from "react-native";
// Design
import { OFF_WHITE, GRAY_4, ORANGE_5 } from "../../design/colors";
import { SEMIBOLD, FS14 } from "../../design/typography";
// Helpers
import { shortenText } from "../../helpers/textHelpers";

const ShelfContentCard = ({ title, thumbnailUrl, type, onPress }) => {
  const cardStyle = StyleSheet.compose([
    styles.card,
    type === "series" && styles.seriesCard,
  ]);

  return (
    <TouchableHighlight
      style={cardStyle}
      onPress={onPress}
      underlayColor={GRAY_4}
    >
      <>
        <Image
          style={styles.thumbnail}
          resizeMode="contain"
          source={thumbnailUrl ? { uri: thumbnailUrl } : null}
        />
        <Text style={styles.bookTitle}>{shortenText(title, 35)}</Text>
      </>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.compose({
  card: {
    height: 150,
    width: 150,
    justifyContent: "center",
    borderRadius: 10,
    marginRight: 10,
    padding: 10,
    backgroundColor: OFF_WHITE,
  },
  seriesCard: {
    backgroundColor: ORANGE_5,
  },
  thumbnail: {
    height: 80,
    marginBottom: 10,
  },
  bookTitle: {
    fontFamily: SEMIBOLD,
    fontSize: FS14,
    alignSelf: "center",
    textAlign: "center",
  },
});

export default ShelfContentCard;
