import React from "react";
import { View, Text, StyleSheet } from "react-native";
// Styling
import { SEMIBOLD, REGULAR, FS24, FS16 } from "../../design/typography";
import { OFF_BLACK, GRAY_2, GRAY_4, RED } from "../../design/colors";
import ActionButton from "../shared/ActionButton";

const TitleSection = ({ title, authors, contentType, onPress }) => {
  return (
    <View style={styles.container}>
      {title ? <Text style={styles.title}>{title}</Text> : null}
      {authors ? (
        <Text style={styles.author}>by {authors.join(", ")}</Text>
      ) : null}
      {/* If content is a video, show button that plays video wherever (right 
        now only YouTube) */}
      {contentType === "video" && (
        <View style={styles.btnContainer}>
          <ActionButton
            title="Play on YouTube"
            buttonStyle={styles.btn}
            onPress={onPress}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderColor: GRAY_4,
    alignItems: "center",
    marginTop: 15,
    paddingHorizontal: 20,
    paddingBottom: 15,
  },
  title: {
    fontFamily: SEMIBOLD,
    fontSize: FS24,
    color: OFF_BLACK,
    textAlign: "center",
  },
  author: {
    fontFamily: REGULAR,
    fontSize: FS16,
    color: GRAY_2,
    textAlign: "center",
    marginTop: 5,
  },
  btnContainer: {
    marginTop: 15,
  },
  btn: {
    backgroundColor: RED,
  },
});

export default TitleSection;
