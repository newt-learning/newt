// Subheaders for Content screens such as Description, Information, etc
import React from "react";
import { Text, StyleSheet } from "react-native";
import { SEMIBOLD, FS18 } from "../../design/typography";
import { GRAY_1 } from "../../design/colors";

const SubHeader = ({ children }) => {
  return <Text style={styles.header}>{children}</Text>;
};

const styles = StyleSheet.create({
  header: {
    fontFamily: SEMIBOLD,
    fontSize: FS18,
    color: GRAY_1,
    marginBottom: 10
  }
});

export default SubHeader;
