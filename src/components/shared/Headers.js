import React from "react";
import { StyleSheet, Text, Platform } from "react-native";
// Styling
import {
  BOLD,
  SEMIBOLD,
  FS32,
  FS24,
  FS20,
  FS18,
} from "../../design/typography";
import { OFF_BLACK } from "../../design/colors";

// Title for navigation header
export const NavHeaderTitle = ({ title, displayLogo }) => (
  <Text style={displayLogo ? styles.logo : styles.navHeader}>{title}</Text>
);

// Header 1 (font size 32)
export const H1 = ({ children, style }) => {
  const textStyle = { ...styles.header, ...styles.h1, ...style };

  return <Text style={textStyle}>{children}</Text>;
};

// Header 2 (font size 24)
export const H2 = ({ children, style }) => {
  const textStyle = { ...styles.header, ...styles.h2, ...style };

  return <Text style={textStyle}>{children}</Text>;
};

// Header 3 (font size 20)
export const H3 = ({ children, style }) => {
  const textStyle = { ...styles.header, ...styles.h3, ...style };

  return <Text style={textStyle}>{children}</Text>;
};

export const H4 = ({ children, style }) => {
  const textStyle = { ...styles.header, ...styles.h4, ...style };

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
  header: {
    color: OFF_BLACK,
    fontFamily: BOLD,
  },
  h1: {
    fontSize: FS32,
  },
  h2: {
    fontSize: FS24,
  },
  h3: {
    fontSize: FS20,
  },
  h4: {
    fontFamily: SEMIBOLD,
    fontSize: FS18,
  },
});
