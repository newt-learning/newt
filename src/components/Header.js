import React from "react";
import { StyleSheet, Text } from "react-native";
// Styling
import { FS18, FS24, BOLD } from "../design/typography";
import { OFF_BLACK } from "../design/colors";

export const HeaderTitle = ({ title, displayLogo }) => (
  <Text style={displayLogo ? styles.logo : styles.title}>{title}</Text>
);

const styles = StyleSheet.create({
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
