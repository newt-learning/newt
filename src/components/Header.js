import React from "react";
import { View, StyleSheet, Text, Platform } from "react-native";
import { Header as ReactNavHeader } from "react-navigation-stack";
// Styling
import { FS18, FS24, BOLD } from "../design/typography";
import { OFF_BLACK, GRAY_4, OFF_WHITE } from "../design/colors";

export const HeaderTitle = ({ title, displayLogo }) => (
  <Text style={displayLogo ? styles.logo : styles.title}>{title}</Text>
);

const Header = ({ title, displayLogo = false }) => {
  return (
    <View style={styles.header}>
      <HeaderTitle title={title} displayLogo={displayLogo} />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 24 + ReactNavHeader.HEIGHT,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: OFF_WHITE,
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
