import React from "react";
import { View, Text, StyleSheet } from "react-native";
// Components
import SubHeader from "./SubHeader";
import ShowMoreShowLess from "./ShowMoreShowLess";
// Styling
import { REGULAR, FS14 } from "../../design/typography";
import { GRAY_4 } from "../../design/colors";
// Helpers
import { shortenText } from "../../helpers/textHelpers";

const TEXT_LIMIT = 400;

const Description = ({
  text,
  showMore,
  setShowMore,
  numCharacters = TEXT_LIMIT,
  containerStyle: passedContainerStyle,
}) => {
  if (!text) {
    return null;
  }

  const containerStyle = StyleSheet.compose(
    styles.container,
    passedContainerStyle
  );

  return (
    <View style={containerStyle}>
      <SubHeader>Description</SubHeader>
      <Text style={styles.text}>
        {showMore ? text : shortenText(text, numCharacters)}
      </Text>
      {text.length > TEXT_LIMIT ? (
        <ShowMoreShowLess showMore={showMore} setShowMore={setShowMore} />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    borderBottomWidth: 1,
    borderColor: GRAY_4,
  },
  text: {
    fontFamily: REGULAR,
    fontSize: FS14,
  },
});

export default Description;
