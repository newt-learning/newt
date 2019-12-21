import React from "react";
import { View, StyleSheet, Text } from "react-native";
// Styling
import { FS24 } from "../design/typography";
import { OFF_BLACK, GRAY_4 } from "../design/colors";

const Header = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>newt</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 80,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 10,
    borderWidth: 1,
    borderColor: GRAY_4
  },
  title: {
    fontFamily: "Righteous",
    color: OFF_BLACK,
    fontSize: FS24,
    letterSpacing: 1
  }
});

export default Header;
