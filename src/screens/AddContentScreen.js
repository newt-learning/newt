import React from "react";
import { View, StatusBar, StyleSheet } from "react-native";
// Components
import ContentButton from "../components/ContentButton";
// Styling
import { GRAY_5, OFF_WHITE, WHITE, RUBY } from "../design/colors";

const AddContentScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={OFF_WHITE} />
      <View style={styles.contentContainer}>
        <ContentButton
          text="Add a book"
          onPress={() => navigation.navigate("Add Book")}
          buttonStyle={styles.bookBtn}
          textStyle={styles.bookBtnText}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GRAY_5
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    margin: 15
  },
  bookBtn: {
    backgroundColor: RUBY
  },
  bookBtnText: {
    color: WHITE
  }
});

export default AddContentScreen;
