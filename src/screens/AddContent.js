import React from "react";
import { View, Text, StatusBar, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
// Components
import Header from "../components/Header";
import ContentButton from "../components/ContentButton";
// Styling
import { OFF_BLACK, OFF_WHITE, WHITE, RUBY } from "../design/colors";
import { REGULAR } from "../design/typography";

const AddContent = () => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={OFF_WHITE} />
      <Header title="Add Content" />
      <View style={styles.contentContainer}>
        <ContentButton
          text="Add a book"
          buttonStyle={styles.bookBtn}
          textStyle={styles.bookBtnText}
        />
      </View>
    </View>
  );
};

AddContent.navigationOptions = {
  tabBarIcon: <Feather name="plus-square" size={20} color={OFF_BLACK} />
};

const styles = StyleSheet.create({
  container: {
    flex: 1
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

export default AddContent;
