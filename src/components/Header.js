import React from "react";
import { View, StyleSheet, Text } from "react-native";
// Styling
import { FS18, FS24, BOLD } from "../design/typography";
import { OFF_BLACK, GRAY_4 } from "../design/colors";

const Header = ({ title, displayLogo = false }) => {
  return (
    <View style={styles.header}>
      <Text style={displayLogo ? styles.logo : styles.title}>{title}</Text>
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
    fontFamily: BOLD,
    color: OFF_BLACK,
    fontSize: FS18
  },
  logo: {
    fontFamily: "Righteous",
    color: OFF_BLACK,
    fontSize: FS24,
    letterSpacing: 1
  }
});

export default Header;
