import React from "react";
import { StyleSheet, Text, Platform } from "react-native";
// Styling
import { BOLD, FS32, FS24, FS18 } from "../../design/typography";
import { OFF_BLACK } from "../../design/colors";

// Title for navigation header
export const NavHeaderTitle = ({ title, displayLogo }) => (
  <Text style={displayLogo ? styles.logo : styles.navHeader}>{title}</Text>
);

// Header 1 (font size 32)
export const H1 = ({ children, style }) => {
  const textStyle = StyleSheet.compose(styles.h1, style);

  return <Text style={textStyle}>{children}</Text>;
};

// Header 2 (font size 24)
export const H2 = ({ children, style }) => {
  const textStyle = StyleSheet.compose(styles.h2, style);

  return <Text style={textStyle}>{children}</Text>;
};

const styles = StyleSheet.create({
  navHeader: {
    fontFamily: BOLD,
    color: OFF_BLACK,
    fontSize: FS18,
    paddingLeft: Platform.OS === "ios" ? 0 : 15,
  },
  logo: {
    fontFamily: "Righteous",
    color: OFF_BLACK,
    fontSize: FS24,
    letterSpacing: 1,
  },
  h1: {
    fontFamily: BOLD,
    fontSize: FS32,
    color: OFF_BLACK,
  },
  h2: {
    fontFamily: BOLD,
    fontSize: FS24,
    color: OFF_BLACK,
  },
});
